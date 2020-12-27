import axios from 'axios';
import { Around, AroundType, Place } from '@/types';

interface AroundRes {
  place: Place;
  near: {
    [key in AroundType]: Around | null;
  };
}
export const getAroundOfPlace = (city: string, place: string) => {
  return axios.get<AroundRes>(`https://simple-life-rental.herokuapp.com/${city}/${place}`);
};
