import React, { FunctionComponent, useState, SyntheticEvent } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.sass';

interface IProps {
  onSearch: (query: string) => void;
  stylesClassName: string;
}

const SearchInput: FunctionComponent<IProps> = ({ onSearch, stylesClassName }) => {
  const [text, setText] = useState('');

  const onSubmit = () => {
    onSearch(text);
  };

  const onChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setText(target.value);
  };

  return (
    <div className={`${stylesClassName} ${styles.wrapper}`}>
      <FormControl
        aria-label="header search"
        onChange={onChange}
      />
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} onClick={onSubmit} />
    </div>
  );
};

export default SearchInput;
