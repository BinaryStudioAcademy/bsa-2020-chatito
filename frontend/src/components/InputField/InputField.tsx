import React from 'react';
import { useField } from 'formik';
import './InputField.sass';

const InputField = ({ label, ...props }: { label: string, name: string, type: string, placeholder?: string }) => {
  const [field, meta] = useField(props);
  return (
    <div className="inputField form-group d-flex flex-column">
      <span>{label}</span>
      <input className={`text-input ${meta.touched && meta.error ? 'invalid-input' : ''}`} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
