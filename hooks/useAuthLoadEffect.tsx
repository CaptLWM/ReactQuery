// 인증정보 호출 hook

import {useEffect} from 'react';
import {applyToken} from '../api/client';
import {useUserState} from '../contexts/UserContext';
import authStorage from '../storages/authStorage';

export default function useAuthLoadEffect() {
  const [, setUser] = useUserState();

  useEffect(() => {
    const fn = async () => {
      const auth = await authStorage.get();
      if (!auth) {
        return;
      }
      setUser(auth.user);
      applyToken(auth.jwt);
    };
    fn();
  }, [setUser]);
}
