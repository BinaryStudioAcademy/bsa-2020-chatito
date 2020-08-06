import React from 'react';
import { useField } from 'formik';
import { InputGroup, FormControl } from 'react-bootstrap';

interface IProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

const InputField = ({ label, ...props }: IProps) => {
  const style = {
    width: '300px'
  };
  const [field, meta] = useField(props);
  return (
    <InputGroup size="sm" className="mb-3" style={style}>
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-sm">{label}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl aria-label={label} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </InputGroup>
  );
};

InputField.defaultProps = {
  placeholder: ''
};

export default InputField;
