import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserContextProvider} from './contexts/UserContext';
import RootStack from './screens/RootStack';

// QueryClientProvider 사용, react-query를 사용하기 위해선 꼭 감싸줘야함
const queryClient = new QueryClient();

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
