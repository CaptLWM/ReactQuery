import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import {RootStackParamList} from './types';
import ArticleScreen from './ArticleScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import MyArticleScreen from './MyArticleScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
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
