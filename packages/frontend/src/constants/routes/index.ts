const routes = {
  login: '/',
  register: '/register',
  profileSettings: '/settings/profile',
  homeChat: (chatId: string) => `/${chatId}`,
};

export default routes;
