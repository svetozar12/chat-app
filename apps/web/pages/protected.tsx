import { withAuthSync } from '@chat-app/web/utils';

function ProtectedPage() {
  return <p>protectted</p>;
}

export const getServerSideProps = withAuthSync();

export default ProtectedPage;
