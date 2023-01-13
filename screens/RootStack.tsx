import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import {RootStackParamList} from './types';
import ArticleScreen from './ArticleScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import MyArticleScreen from './MyArticleScreen';
import useAuthLoadEffect from '../hooks/useAuthLoadEffect';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  // useUserState는 UserContextProvider로 감싼 컴포넌트 내부에서만 사용 가능
  useAuthLoadEffect(); // 인증정보 불러오기
  return (
    <Stack.Navigator screenOptions={{headerBackTitle: '닫기'}}>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: '회원가입'}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name="MyArticles"
        component={MyArticleScreen}
        options={{title: '내가 쓴 글'}}
      />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={{title: '게시글'}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
