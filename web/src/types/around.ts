import { Place, Distance } from '.';

export interface Around {
  place: Place;
  distance: Distance;
}

export enum AroundType {
  kfc = 'kfc',
  mc = 'mc',
  drink = 'drink',
  coffee = 'coffee',
  cvs = 'cvs',
  supermarket = 'supermarket',
  market = 'market',
  bank = 'bank',
  hospital = 'hospital',
  subway = 'subway',
  bus = 'bus'
}
