import React, { useState } from 'react';
import 'antd/dist/antd.css';
import styles from './App.module.scss';
import { Header } from './components/header';
import { SearchResult } from './components/search-result';

function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <div className={styles['app']}>
      <Header onUpdateSearchText={setSearchText} />
      <SearchResult searchText={searchText} />
    </div>
  );
}

export default App;
