import fetch from 'node-fetch';
import './String';
import Location from '../models/Location';
import Place from '../models/Place';
import Distance from '../models/Distance';
import Around from '../models/Around';

const AMAP_KEYWORDS_SEARCH = 'https://restapi.amap.com/v3/place/text?key={0}&keywords={1}&city={2}';
const AMAP_AROUND_SEARCH_BY_KEYWORDS = 'https://restapi.amap.com/v3/place/around?key={0}&location={1}&keywords={2}';
const AMAP_AROUND_SEARCH_BY_TYPES = 'https://restapi.amap.com/v3/place/around?key={0}&location={1}&types={2}';
const AMAP_DISTANCES_ON_FOOT = 'https://restapi.amap.com/v3/distance?key={0}&origins={1}&destination={2}&type=3';

class AMapInternal {
  static joinArray = (a: string[]) => {
    return a.join('|');
  };

  static keywordsSearch = async (key: string, keywords: string[], city: string) => {
    return fetch(encodeURI(AMAP_KEYWORDS_SEARCH.format(key, AMapInternal.joinArray(keywords), city)))
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };

  static aroundSearchByKeywords = async (key: string, location: string, keywords: string[]) => {
    return fetch(encodeURI(AMAP_AROUND_SEARCH_BY_KEYWORDS.format(key, location, AMapInternal.joinArray(keywords))))
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };

  static aroundSearchByTypes = async (key: string, location: string, types: string[]) => {
    return fetch(encodeURI(AMAP_AROUND_SEARCH_BY_TYPES.format(key, location, AMapInternal.joinArray(types))))
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };

  static distanceOnFoot = async (key: string, origins: string[], dest: string) => {
    return fetch(encodeURI(AMAP_DISTANCES_ON_FOOT.format(key, AMapInternal.joinArray(origins), dest)))
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  };
}

const NEAREST_LIMIT = 3;

class AMap {
  static key = '';

  static loadKey = (key: string) => {
    AMap.key = key;
  };

  static parseLocation = (location: string) => {
    const lonlat = location.split(',');
    return new Location(Number.parseFloat(lonlat[1]), Number.parseFloat(lonlat[0]));
  };

  static parseTel = (tel: string | []) => {
    if (tel instanceof Array) {
      return '';
    } else {
      return tel.split(/,|;/)[0];
    }
  };

  static parsePlace = (poi: any) => {
    return new Place(
      poi.name,
      poi.pname,
      poi.cityname,
      poi.adname,
      poi.address,
      AMap.parseLocation(poi.location),
      AMap.parseTel(poi.tel)
    );
  };

  static parseDistance = (distance: any) => {
    return new Distance(Number.parseInt(distance.distance), Number.parseInt(distance.duration));
  };

  static searchPlace = async (city: string, name: string, index?: number, size?: number) => {
    return AMapInternal.keywordsSearch(AMap.key, [name], city).then((res) => {
      const idx = index || 0;
      const sz = size || 10;
      const boundary = Math.min(idx + sz, res.pois.length);

      let places = [];
      for (let i = idx; i < boundary; i++) {
        places.push(res.pois[i].name);
      }
      return {
        count: Number.parseInt(res.count),
        places
      };
    });
  };

  static getPlace = async (city: string, name: string, index?: number) => {
    return AMapInternal.keywordsSearch(AMap.key, [name], city).then((res) => {
      const idx = index || 0;

      if (res.pois.length === 0) {
        return null;
      }

      return AMap.parsePlace(res.pois[idx]);
    });
  };

  static getAroundsByName = async (location: Location, name: string, index?: number, size?: number) => {
    return AMap.getAroundsByNames(location, [name], index, size);
  };

  static getAroundsByNames = async (location: Location, names: string[], index?: number, size?: number) => {
    return AMapInternal.aroundSearchByKeywords(AMap.key, location.toLocationString(), names)
      .then((res) => {
        const idx = index || 0;
        const sz = size || 10;
        let pois = res.pois;
        const boundary = Math.min(idx + sz, pois.length);

        let places = [];
        let promises = [];
        for (let i = idx; i < boundary; i++) {
          let place = AMap.parsePlace(pois[i]);
          places.push(place);
          promises.push(AMap.getDistance(location, place.location));
        }
        let promiseAll = Promise.all(promises);
        return Promise.all([Number.parseInt(res.count), places, promiseAll]).then();
      })
      .then((res) => {
        let arounds = [];
        let places = res[1];
        let distances = res[2];
        for (let i = 0; i < places.length; i++) {
          arounds.push(new Around(places[i], distances[i]));
        }
        return {
          count: res[0],
          arounds
        };
      });
  };

  static getAroundsByType = async (location: Location, type: string, index?: number, size?: number) => {
    return AMap.getAroundsByTypes(location, [type], index, size);
  };

  static getAroundsByTypes = async (location: Location, types: string[], index?: number, size?: number) => {
    return AMapInternal.aroundSearchByTypes(AMap.key, location.toLocationString(), types)
      .then((res) => {
        const idx = index || 0;
        const sz = size || 10;
        let pois = res.pois;
        const boundary = Math.min(idx + sz, pois.length);

        let places = [];
        let promises = [];
        for (let i = idx; i < boundary; i++) {
          let place = AMap.parsePlace(pois[i]);
          places.push(place);
          promises.push(AMap.getDistance(location, place.location));
        }
        let promiseAll = Promise.all(promises);
        return Promise.all([Number.parseInt(res.count), places, promiseAll]).then();
      })
      .then((res) => {
        let arounds = [];
        let places = res[1];
        let distances = res[2];
        for (let i = 0; i < places.length; i++) {
          arounds.push(new Around(places[i], distances[i]));
        }
        return {
          count: res[0],
          arounds
        };
      });
  };

  static getAroundsCountByName = async (location: Location, name: string) => {
    return AMap.getAroundsCountByNames(location, [name]);
  };

  static getAroundsCountByNames = async (location: Location, names: string[]) => {
    return AMapInternal.aroundSearchByKeywords(AMap.key, location.toLocationString(), names).then((res) => {
      return Number.parseInt(res.count);
    });
  };

  static getAroundsCountByType = async (location: Location, type: string) => {
    return AMap.getAroundsCountByTypes(location, [type]);
  };

  static getAroundsCountByTypes = async (location: Location, types: string[]) => {
    return AMapInternal.aroundSearchByTypes(AMap.key, location.toLocationString(), types).then((res) => {
      return Number.parseInt(res.count);
    });
  };

  static getNearestByName = async (location: Location, name: string) => {
    return AMap.getNearestByNames(location, [name]);
  };

  static getNearestByNames = async (location: Location, names: string[]) => {
    return AMap.getAroundsByNames(location, names, 0, NEAREST_LIMIT).then((res) => {
      res.arounds.sort((a, b) => {
        return a.distance.distance - b.distance.distance;
      });

      return res.arounds[0];
    });
  };

  static getNearestByType = async (location: Location, type: string) => {
    return AMap.getNearestByTypes(location, [type]);
  };

  static getNearestByTypes = async (location: Location, types: string[]) => {
    return AMap.getAroundsByTypes(location, types, 0, NEAREST_LIMIT).then((res) => {
      res.arounds.sort((a, b) => {
        return a.distance.distance - b.distance.distance;
      });

      return res.arounds[0];
    });
  };

  static getDistance = async (origin: Location, destination: Location) => {
    return AMapInternal.distanceOnFoot(AMap.key, [origin.toLocationString()], destination.toLocationString()).then(
      (res) => {
        return AMap.parseDistance(res.results[0]);
      }
    );
  };
}

export default AMap;
