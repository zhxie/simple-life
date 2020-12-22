class Location {
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  static fromLocationString = (s: string, isLatitudeFirst?: boolean) => {
    const values = s.split(',');
    const former = Number.parseFloat(values[0]);
    const latter = Number.parseFloat(values[1]);
    if (isLatitudeFirst === true) {
      return new Location(former, latter);
    } else {
      return new Location(latter, former);
    }
  };

  toLocationString = (isLatitudeFirst?: boolean) => {
    const latitude = this.latitude.toFixed(6);
    const longitude = this.longitude.toFixed(6);
    if (isLatitudeFirst === true) {
      return '{0},{1}'.format(latitude, longitude);
    } else {
      return '{0},{1}'.format(longitude, latitude);
    }
  };
}

export default Location;
