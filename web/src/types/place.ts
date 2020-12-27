import { Location } from '.';

export interface Place {
  name: string;
  province: string;
  city: string;
  district: string;
  address: string;
  location: Location;
  tel: string;
}
