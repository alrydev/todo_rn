import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from "react-query"
import { AntDesign } from '@expo/vector-icons';
import Homepage from './src/screens/Homepage';
import TodoList from './src/screens/TodoList';
import AddList from './src/screens/AddList';
import AddCategory from './src/screens/AddCategory';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    const client = new QueryClient()
    return (
        <NavigationContainer>
            <QueryClientProvider client={client}>

                <Tab.Navigator initialRouteName >
                    <Tab.Screen name="Home" component={Homepage} />
                    <Tab.Screen name="Register" component={Register} />
                    <Tab.Screen name="Login" component={Login} />
                    <Tab.Screen name="Todo List" component={TodoList} />
                    <Tab.Screen name="Add List" component={AddList} />
                    <Tab.Screen name="AddCategory" component={AddCategory} />
                </Tab.Navigator>
            </QueryClientProvider>
        </NavigationContainer>
    );
}