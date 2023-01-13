// 로그인/회원가입 오류 처리 ios:Alert, android:Toast

import {useCallback} from 'react';
import {Alert, Platform, ToastAndroid} from 'react-native';

export default function useInform() {
  const inform = useCallback(({title, message}: InformParams) => {
    if ((Platform.OS = 'ios')) {
      Alert.alert(title ?? '알림', message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }, []);
  return inform;
}

interface InformParams {
  title?: string;
  message: string;
}
