import { SignUpForm } from '../components/form/sign-up-form';
import { AuthLayout } from '../layout/auth-layout';

export const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};
