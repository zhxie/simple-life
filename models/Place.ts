import Location from './Location';

class Place {
  name: string;
  province: string;
  city: string;
  district: string;
  address: string;
  location: Location;
  tel: string;

  constructor(
    name: string,
    province: string,
    city: string,
    district: string,
    address: string,
    location: Location,
    tel: string
  ) {
    this.name = name;
    this.province = province;
    this.city = city;
    this.district = district;
    this.address = address;
    this.location = location;
    this.tel = tel;
  }
}

export default Place;
