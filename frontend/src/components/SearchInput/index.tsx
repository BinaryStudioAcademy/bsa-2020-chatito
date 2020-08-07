import React, { FunctionComponent, useState, SyntheticEvent } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

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
    <InputGroup className={stylesClassName}>
      <FormControl
        placeholder="Find smth..."
        aria-label="header search"
        onChange={onChange}
      />
      {/* <Button variant="secondary" onClick={onSubmit}>Button</Button> */}
    </InputGroup>
  );
};

export default SearchInput;
