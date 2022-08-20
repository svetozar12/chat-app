import React from 'react';
import RegisterLayout from 'components/PageLayout/Register';
import { isAlreadyAuth } from 'utils/auth';

function Register() {
  return <RegisterLayout />;
}
export const getServerSideProps = isAlreadyAuth();
export default Register;
