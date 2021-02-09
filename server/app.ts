import express from 'express';
import timeout from 'connect-timeout';
import morgan from 'morgan';
import cors from 'cors';
import AMap from './utils/AMap';
import Location from './models/Location';
import { Types, Keywords } from './models/Types';

AMap.loadKey(process.env.AMAP_KEY || 'aa70529446e38c9a3bd55dc748d1501b');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(timeout('5s'));
app.use(morgan('[morgan] [:date[clf]] :remote-addr :method :url :status'));

app.get('/', (_req, resp) => {
  resp.send('Use API to connect to a simple life.');
});

app.get('/s/:city/:name', (req, resp) => {
  const city = req.params.city;
  const name = req.params.name;
  return AMap.searchPlace(city, name)
    .then((res) => {
      if (res.places.length == 0) {
        resp.status(404).send();
      } else {
        resp.status(200).send(res);
      }
    })
    .catch((e) => {
      console.error(e);
      resp.status(500).send();
    });
});

app.get('/p/:city/:name', (req, resp) => {
  const city = req.params.city;
  const name = req.params.name;
  return AMap.getPlace(city, name)
    .then((res) => {
      if (res === null) {
        resp.status(404).send();
      } else {
        resp.status(200).send(res);
      }
    })
    .catch((e) => {
      console.error(e);
      resp.status(500).send();
    });
});

app.get('/a/:location/:type', (req, resp) => {
  try {
    const location = Location.fromLocationString(req.params.location, true);
    const type = Types.getType(req.params.type);
    if (type === null) {
      resp.status(404).send();
    } else {
      return AMap.getAroundsByTypes(location, type)
        .then((res) => {
          resp.status(200).send(res);
        })
        .catch((e) => {
          console.error(e);
          resp.status(500).send();
        });
    }
  } catch (e) {
    console.error(e);
    resp.status(500).send();
  }
});

app.get('/n/:location/:keyword', (req, resp) => {
  try {
    const location = Location.fromLocationString(req.params.location, true);
    const keyword = Keywords.getKeyword(req.params.keyword);
    if (keyword == null) {
      resp.status(404).send();
    } else {
      return AMap.getNearestByNames(location, keyword)
        .then((res) => {
          resp.status(200).send(res);
        })
        .catch((e) => {
          console.error(e);
          resp.status(500).send();
        });
    }
  } catch (e) {
    console.error(e);
    resp.status(500).send();
  }
});

app.get('/:city/:name', (req, resp) => {
  const city = req.params.city;
  const name = req.params.name;
  return AMap.getPlace(city, name)
    .then((res) => {
      if (res === null) {
        resp.status(404).send();
      } else {
        const location = res.location;

        let promises = [];
        promises.push(AMap.getNearestByNames(location, Keywords.getKeyword('kfc')!));
        promises.push(AMap.getNearestByNames(location, Keywords.getKeyword('mc')!));
        promises.push(AMap.getNearestByNames(location, Keywords.getKeyword('drink')!));
        promises.push(AMap.getNearestByNames(location, Keywords.getKeyword('coffee')!));
        promises.push(AMap.getNearestByNames(location, Keywords.getKeyword('cvs')!));
        promises.push(AMap.getNearestByNames(location, Keywords.getKeyword('supermarket')!));
        promises.push(AMap.getNearestByNames(location, Keywords.getKeyword('market')!));
        promises.push(AMap.getNearestByNames(location, Keywords.getKeyword('bank')!));
        promises.push(AMap.getNearestByTypes(location, Types.getType('hospital')!));
        promises.push(AMap.getNearestByTypes(location, Types.getType('subway')!));
        promises.push(AMap.getNearestByTypes(location, Types.getType('bus')!));

        return Promise.all(promises).then((r) => {
          resp.status(200).send({
            place: res,
            near: {
              kfc: r[0],
              mc: r[1],
              drink: r[2],
              coffee: r[3],
              cvs: r[4],
              supermarket: r[5],
              market: r[6],
              bank: r[7],
              hospital: r[8],
              subway: r[9],
              bus: r[10]
            }
          });
        });
      }
    })
    .catch((e) => {
      console.error(e);
      resp.status(500).send();
    });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`[server] server is running at http://localhost:${PORT}`);
});
