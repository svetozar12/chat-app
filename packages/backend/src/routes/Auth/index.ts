import buildRoute from '../../utils/buildRoute';
import AuthController from './Auth.Controller';

const AuthRoute = buildRoute(AuthController);

export default AuthRoute;
