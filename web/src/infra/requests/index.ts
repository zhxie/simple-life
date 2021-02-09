import axios from 'axios';
import { Around, AroundType, Place } from '@/types';

// https://simple-life-rental.herokuapp.com
const request = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

interface AroundRes {
  place: Place;
  near: {
    [key in AroundType]: Around | null;
  };
}
export const getAroundOfPlace = (city: string, place: string) => {
  return request.get<AroundRes>(`/${city}/${place}`);
};
