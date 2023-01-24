import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { UserContext } from './src/context/UserContext'

// import { UserContext } from './src/context/UserContext'
import { FontAwesome } from "@expo/vector-icons"
// import Spinner from 'react-native-loading-spinner-overlay'
import Spinner from 'react-native-loading-spinner-overlay'
// screens
import Login from "./src/screens/Login"
import Register from "./src/screens/Register"
import Homepage from "./src/screens/Homepage"
import TodoList from "./src/screens/TodoList"
import AddList from "./src/screens/AddList"
import AddCategory from "./src/screens/AddCategory"
import DetailList from './src/screens/DetailList'


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
console.disableYellowBox = true;
function BottomTab() {
    return (
        <Tab.Navigator
            initialRouteName="My list"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "My list") {
                        iconName = focused ? "tasks" : "tasks"
                    } else if (route.name === "addcategory") {
                        iconName = focused ? "calendar-plus-o" : "calendar-plus-o";
                    }
                    else if (route.name === "addlist") {
                        iconName = focused ? "puzzle-piece" : "puzzle-piece"
                    }


                    return <FontAwesome name={iconName} size={size} color={color} />
                },

                tabBarInactiveTintColor: "gray"
            })}
        >
            <Tab.Screen name="My list" component={TodoList} />
            <Tab.Screen name="addcategory" component={AddCategory} />
            <Tab.Screen name="addlist" component={AddList} />
        </Tab.Navigator>
    );
}



export default function Container() {

    const [state, dispatch] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        try {
            let token = await AsyncStorage.getItem("token")

            if (token) setAuthorization(token)

            // yg ini kita bakal verify-token nya, dan yg  di dalem .then itu kita bikin kondisi  kalo  statusnya >= 400 maka bakal ngdispatch type nya di ganti jadi "AUTH_ERROR" 
            await API.post("https://api.kontenbase.com/query/api/v1/30e0c3b4-dccc-4d79-8f07-7adf36304d4b/auth/verify-token", {
                validateStatus: () => true,
            })
                .then((response) => {
                    if (response.status >= 400) {
                        return dispatch({
                            type: "AUTH_ERROR",
                        })
                    }

                    // nah ini kita bikin payload dulu, yg di ambil dari response.data
                    const payload = response.data

                    // kalo yg di atas ga ada mslh bakal jalanin yg ini, fungsinya sama kya yg dispatch di atas
                    dispatch({
                        type: "AUTH_SUCCESS",
                        payload,
                    })
                })
                .catch((error) => {
                    dispatch({
                        type: "AUTH_ERROR",
                    })
                })
            //kalo yg di atas ga ada mslh bakal ngjalanin setIsLoading
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    //nah ini yg bakal di panggil di useEffect, yg isinya tuh kita manggi syncStoragenya lgi, trus kita panggil checkAuth yg ada di atas tadi
    const checkUser = async () => {
        await AsyncStorage.getItem("token")
        checkAuth()
    }

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <>
            {
                // isLoading ? (
                //     <Spinner size="large" visible={isLoading} textContent={'Waiting...'} overlayColor="rgba(0, 0, 0, 0.25)" />
                // ) :
                state.isLogin ? (
                    <Stack.Navigator>
                        <Stack.Screen name="todolist" component={BottomTab} options={{ title: 'Todo List' }} />
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={Homepage} />
                        <Stack.Screen name="register" component={Register} options={{ title: 'register' }} />
                        {/* <Stack.Screen name="todolist" component={BottomTab} options={{ headerShown: false }} /> */}
                        <Stack.Screen name="login" component={Login} options={{ title: 'Login' }} />
                    </Stack.Navigator>
                )
            }
        </>


    )
}
