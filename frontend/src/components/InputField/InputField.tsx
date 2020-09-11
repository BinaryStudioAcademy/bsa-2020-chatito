import React from 'react';
import { useField } from 'formik';
import { InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.module.sass';

interface IProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  link?: string;
  linkDescription?: string;
  linkClassName?: string;
}

const InputField = ({
  label,
  link,
  linkDescription,
  linkClassName,
  ...props
}: IProps) => {
  const [field, meta] = useField(props);
  const { name } = props;
  return (
    <div className={`${styles.inputContainer} w-100`}>
      <div className={styles.labelRow}>
        <label className={styles.inputLabel} htmlFor={label}>{label}</label>
        {link
          ? (
            <Link
              className={`${styles.navLink} ${linkClassName}`}
              to={link}
            >
              {linkDescription}
            </Link>
          ) : null}
      </div>
      <InputGroup size="sm" className={`${styles.inputGroup}`}>
        {console.log(label)}
        <FormControl
          id={label}
          aria-label={label}
          {...field}
          {...props}
          className={name === 'password' || name === 'confirmPassword' ? styles.passwordInput : ''}
        />
      </InputGroup>
      {meta.touched && meta.error ? (
        <div className={`text-danger ${styles.error}`}>{meta.error}</div>
      ) : null}
    </div>
  );
};

InputField.defaultProps = {
  placeholder: '',
  link: undefined,
  linkDescription: undefined,
  linkClassName: undefined
};

export default InputField;
