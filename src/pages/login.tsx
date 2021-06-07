import Layout from '../components/layout';
import LoginForm from '../components/login-form';
import { useUser } from '../utils/hooks';

const Login: React.FC = () => {
  useUser({ redirectTo: '/dashboard', redirectIfFound: true });

  return (
    <Layout>
      <div className="max-w-sm mx-auto bg-gray-100 border rounded p-4">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
