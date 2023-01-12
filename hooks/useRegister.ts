import {useMutation} from 'react-query';
import {register} from '../api/auth';
import {AuthError} from '../api/types';

export default function useRegister() {
  const mutation = useMutation(register, {
    onSuccess: data => {
      console.log('data', data);
    },
    onError: (error: AuthError) => {
      console.log('error', error);
    },
  });
  return mutation;
}
