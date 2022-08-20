import * as Yup from 'yup';

const Base = {
  username: Yup.string()
    .min(3, 'username should have a minimum length of 3')
    .max(30, 'username should have a maximum length of 30')
    .required('username is a required field'),
  password: Yup.string()
    .min(3, 'password should have a minimum length of 3')
    .max(30, 'password should have a maximum length of 30')
    .required('password is a required field'),
};

const LoginSchema = Yup.object({ ...Base });

const RegisterSchema = Yup.object({
  ...Base,
  email: Yup.string()
    .min(3, 'email should have a minimum length of 3')
    .max(30, 'email should have a maximum length of 30')
    .required('email is a required field'),
  gender: Yup.string().required('gender is a required field'),
});

export { LoginSchema, RegisterSchema };
