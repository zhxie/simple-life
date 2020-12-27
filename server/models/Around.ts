import Place from './Place';
import Distance from './Distance';

class Around {
  place: Place;
  distance: Distance;

  constructor(place: Place, distance: Distance) {
    this.place = place;
    this.distance = distance;
  }
}

export default Around;
