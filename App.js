
import { Text, View } from 'react-native';
import { Button, NativeBaseProvider } from 'native-base';
import { NavigationContainer } from "@react-navigation/native"
import Homepage from './src/screens/Homepage';
import AddList from './src/screens/AddList';
import Register from './src/screens/Register';
import AddCategory from './src/screens/AddCategory';
import TodoList from './src/screens/TodoList';
import DetailList from './src/screens/DetailList';
import Header from './src/Component/Header'
// import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from './src/context/UserContext';
import Container from './Container';
import Test from './Test'
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Warning: Failed prop type: Invalid props.style key `tintColor` supplied to `Text`.',
]); //Hide warnings

LogBox.ignoreAllLogs();//Hide all warning notifications on front-end

console.disableYellowBox = true;
export default function App() {
  const client = new QueryClient();
  return (
    <NavigationContainer>

      <NativeBaseProvider>
        <QueryClientProvider client={client}>
          <UserContextProvider>
            <Container />
          </UserContextProvider>
        </QueryClientProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

