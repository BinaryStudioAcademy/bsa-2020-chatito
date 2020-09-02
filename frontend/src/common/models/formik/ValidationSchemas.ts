import * as Yup from 'yup';

const signUpPassword = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .required('Password is required')
  .matches(
    /^.*((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    'Password must include both uppercase and lowercase letters'
  )
  .matches(
    /^.*(?=.*\d).*$/,
    'Password must include numbers'
  )
  .matches(
    /^.*((?=.*[!/@#$%^&*()\-_=+{};:,<.>]){1}).*$/,
    'Password must include special symbols'
  );

const signInPassword = Yup.string()
  .required('Password is required');

const email = Yup.string()
  .email('Email is invalid')
  .required('Email is required');

const confirmPassword = Yup.string()
  .oneOf([Yup.ref('password'), ''], 'Passwords must match')
  .required('Confirm Password is required');

const workspaceName = Yup.string()
  .required('Workspace name is required')
  .min(5, 'Enter more, than 5 symbols')
  .max(40, 'Workspace name should be no longer 40 characters');

const fullName = Yup.string()
  .required('Full Name is required')
  .max(100, 'Full name should be no longer 100 characters');

export const signInValSchema = Yup.object().shape({
  email,
  password: signInPassword
});

export const signUpValSchema = Yup.object().shape({
  fullName,
  email,
  password: signUpPassword,
  confirmPassword
});

export const forgotPasswordSchema = Yup.object().shape({
  email
});

export const resetPasswordSchema = Yup.object().shape({
  password: signUpPassword,
  confirmPassword
});

export const inviteLinkSchema = Yup.object().shape({
  email
});

export const createWorkspaceValSchema = Yup.object().shape({
  workspaceName
});
