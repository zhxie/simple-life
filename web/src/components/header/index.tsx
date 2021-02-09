import React from 'react';
import Input from 'antd/es/input';
import styles from './index.module.scss';

interface Props {
  className?: string;
  onUpdateSearchText: (text: string) => void;
}

export const Header: React.FC<Props> = ({ className, onUpdateSearchText }) => {
  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onUpdateSearchText(e.target['value']);
  };

  return (
    <div className={styles['sidebar']}>
      <div className={styles['title']}>Simple Life</div>
      <Input className={styles['input']} placeholder='请输入想要查询的地点' onPressEnter={onSearch} />
    </div>
  );
};
