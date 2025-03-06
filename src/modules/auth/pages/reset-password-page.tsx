import { Navigate, useParams } from 'react-router-dom';

import { ResetPasswordForm } from '../components/form/reset-password-form';
import { AuthLayout } from '../layout/auth-layout';

export const ResetPasswordPage = () => {
  const { token } = useParams();

  if (!token) {
    <Navigate to="/" replace />;
  }

  return (
    <AuthLayout>
      <ResetPasswordForm token={token!} />
    </AuthLayout>
  );
};
