import React from 'react';
import RegisterLayout from 'components/PageLayout/Register';
import { isAlreadyAuth } from 'utils/auth';
import { NextPage } from 'next';
import { ILogin } from 'pages';

const Register: NextPage<ILogin> = (props: ILogin) => <RegisterLayout {...props} />;

export const getServerSideProps = isAlreadyAuth();

export default Register;
