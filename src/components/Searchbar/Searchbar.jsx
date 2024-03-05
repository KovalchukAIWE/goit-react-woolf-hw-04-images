import { useState } from 'react';
import styles from './Searchbar.module.css';

const Searchbar = ({ handleSubmit }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = e => {
    setSearchText(e.target.value);
  };

  const handleSearchbarSubmit = e => {
    e.preventDefault();
    handleSubmit(searchText);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSearchbarSubmit}>
        <button className={styles.buttonSearch}>
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          onChange={handleChange}
          value={searchText}
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
