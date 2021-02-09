import { getAroundOfPlace } from '@/infra/requests';
import { Around, AroundType } from '@/types';
import React, { useEffect, useState } from 'react';
import { AroundCard } from '../around-card';
import styles from './index.module.scss';

interface Props {
  searchText: string;
}

export const SearchResult: React.FC<Props> = ({ searchText }) => {
  const [loading, setLoading] = useState(false);
  const [arounds, setAdrounds] = useState<(Around & { type: AroundType })[]>([]);

  useEffect(() => {
    if (!searchText) {
      return;
    }
    setLoading(true);
    getAroundOfPlace('杭州', searchText).then((res) => {
      const { near } = res.data;
      setAdrounds(
        Object.keys(near)
          .map((type) => ({ ...near[type], type }))
          .filter((around) => !!around.place)
      );
      setLoading(false);
    });
  }, [searchText]);

  return (
    <div className={styles['search-result']}>
      {loading && <div className='loading'>加载中……</div>}
      {arounds.map((around) => (
        <AroundCard key={around.place.name} type={around.type} around={around} />
      ))}
    </div>
  );
};
