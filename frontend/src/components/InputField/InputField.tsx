import React from 'react';
import { useField } from 'formik';
import { InputGroup, FormControl } from 'react-bootstrap';
import styles from './styles.module.sass';

interface IProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

const InputField = ({ label, ...props }: IProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <InputGroup size="sm" className={styles.inputGroup}>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">{label}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl aria-label={label} {...field} {...props} />
      </InputGroup>
      {meta.touched && meta.error ? (
        <div className={`text-danger ${styles.error}`}>{meta.error}</div>
      ) : null}
    </div>
  );
};

InputField.defaultProps = {
  placeholder: ''
};

export default InputField;
