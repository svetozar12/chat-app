import { NextPage } from 'next';
import React from 'react';
import LogoutLayout from 'components/PageLayout/LogoutLayout';
// services
import withAuthSync from '../utils/auth';

const Logout: NextPage = () => <LogoutLayout />;

export const getServerSideProps = withAuthSync();

export default Logout;
