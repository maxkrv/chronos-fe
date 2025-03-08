import { LoginForm } from '../components/form/login-form';
import { AuthLayout } from '../layout/auth-layout';

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
