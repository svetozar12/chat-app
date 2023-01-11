import React from 'react';
import { isAlreadyAuth } from 'utils/auth';
import { NextPage } from 'next';
import RegisterForm from 'components/RegisterForm';

const Register: NextPage = () => <RegisterForm />;

export const getServerSideProps = isAlreadyAuth();

export default Register;
