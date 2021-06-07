import Layout from '../components/layout';
import { useUser } from '../utils/hooks';

const Home: React.FC = () => {
  useUser({ redirectTo: '/dashboard', redirectIfFound: true });

  return (
    <Layout>
      <>
        <h1 className="text-4xl mb-4">Welcome to Next Fauna Magic!</h1>

        <p className="text-xl text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </>
    </Layout>
  );
};

export default Home;
