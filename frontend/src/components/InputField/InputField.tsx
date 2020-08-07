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
  const errorStyle = {
    fontSize: '12px',
    padding: '2px .5rem'
  };
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <InputGroup size="sm" style={style}>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">{label}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl aria-label={label} {...field} {...props} />
      </InputGroup>
      {meta.touched && meta.error ? (
        <div className="text-danger" style={errorStyle}>{meta.error}</div>
      ) : null}
    </div>
  );
};

InputField.defaultProps = {
  placeholder: ''
};

export default InputField;
