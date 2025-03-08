import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { useNavigate, useParams } from 'react-router-dom';

import { USER_ACTIVATION } from '@/shared/constants/query-keys';

import { AuthService } from '../services/auth.service';

export const ActivateAccountPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { isError, isSuccess, isLoading } = useQuery({
    queryKey: [USER_ACTIVATION, token],
    queryFn: () => {
      return AuthService.activate(token!);
    },
    enabled: !!token
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [isSuccess]);

  if (!token) {
    navigate('/', { replace: true });

    return null;
  }

  return (
    <div className="h-svh flex items-center justify-center">
      {isLoading && <CgSpinner className="animate-spin h-10 w-10" />}

      {isError && (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-balance text-sm text-muted-foreground">There was an error activating your account</p>
        </div>
      )}

      {isSuccess && (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Success</h1>
          <p className="text-balance text-sm text-muted-foreground">Your account has been activated</p>
        </div>
      )}
    </div>
  );
};
