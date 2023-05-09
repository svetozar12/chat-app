import { withAuthSync } from '@chat-app/web/utils';
import Home from '../components/Home/Home';

function ProtectedPage() {
  return <Home />;
}

export const getServerSideProps = withAuthSync();

export default ProtectedPage;
