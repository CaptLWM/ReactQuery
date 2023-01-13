// 사용자 메뉴 화면
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {clearToken} from '../api/client';
import MenuItem from '../components/MenuItem';
import {useUserState} from '../contexts/UserContext';
import authStorage from '../storages/authStorage';
import {RootStackNavigationProp} from './types';

function UserMenuScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [user, setUser] = useUserState();
  const onLogin = () => navigation.navigate('Login');
  const onRegister = () => navigation.navigate('Register');
  const onLogout = () => {
    setUser(null);
    clearToken();
    authStorage.clear(); // authStorage에 저장된 정보 초기화
  };

  return (
    <View>
      {user ? (
        <MenuItem name="로그아웃" onPress={onLogout} />
      ) : (
        <>
          <MenuItem name="로그인" onPress={onLogin} />
          <MenuItem name="회원가입" onPress={onRegister} />
        </>
      )}
    </View>
  );
}

export default UserMenuScreen;
