import * as Yup from 'yup';

export const signInValSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 characters')
    .required('Password is required')
});

export const signUpValSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full Name is required')
    .max(100, 'Full name should be no longer 100 characters'),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required')
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required')
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required')
});

export const inviteLinkSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required')
});
