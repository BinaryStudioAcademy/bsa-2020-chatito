import React from 'react';
import { useField } from 'formik';

interface IInputField {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

const InputField = ({ label, ...props }: IInputField) => {
  const style = {
    width: '300px'
  };
  const [field, meta] = useField(props);
  return (
    <div className="inputField form-group d-flex flex-column" style={style}>
      <span>{label}</span>
      <input className={`text-input ${meta.touched && meta.error ? 'invalid-input' : ''}`} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
