import React from 'react';
import { Around, AroundType } from '@/types';
import Card from 'antd/es/card';
import styles from './index.module.scss';

interface Props {
  type: AroundType;
  around: Around;
}

export const AroundCard: React.FC<Props> = ({ type, around }) => {
  return (
    <Card className={styles['around-card']} title={around.place.name}>
      <div className='address'>{around.place.address}</div>
      <div className='distance'>{around.distance.distance}m</div>
    </Card>
  );
};
