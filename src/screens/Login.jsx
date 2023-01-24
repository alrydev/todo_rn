import AsyncStorage from "@react-native-async-storage/async-storage"
import { NativeBaseProvider, Button, Text, Image, Box, Center, VStack, Input, Link } from "native-base"
import { FormControl } from "native-base"
import React, { useState, useContext } from 'react'
import { useMutation } from "react-query"
import { API } from "../config/api"
import { setAuthorization } from "../config/api"
import { UserContext } from "../context/UserContext"

export default function Login({ navigation }) {
    const [state, dispatch] = useContext(UserContext)
    const [dataLogin, setDataLogin] = useState({
        email: "",
        password: ""
    })
    console.log(dataLogin);

    function handleChangeText(name, value) {
        setDataLogin({
            ...dataLogin,
            [name]: value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        e.preventDefault()
        try {
            // const body = JSON.stringify(dataLogin)
            const response = await API.post("https://api.kontenbase.com/query/api/v1/30e0c3b4-dccc-4d79-8f07-7adf36304d4b/auth/login", dataLogin)

            const payload = response.data;
            console.log("ini payload", payload);
            if (response?.status === 200) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload,
                });
                navigation.navigate("todolist")
                alert("success")
            }

        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
    })

    return (
        <>
            <VStack flex="1" space={3} alignItems="center" justifyContent="center">
                <Center rounded="lg"   >
                    <Image source={require('../../assets/login-bg.png')} alt="bg-auth" />
                </Center>

                <Center w="64" rounded="md" >
                    <Text fontSize="2xl" pb="2" bold >
                        Login
                    </Text>
                    <FormControl w="100%">
                        <Input
                            p={2} w="100%" bg="muted.200" fontSize={15} borderWidth={2} borderRadius={8} borderColor="muted.400"
                            placeholder="Email" keyboardType="email-address"
                            onChangeText={(value) => handleChangeText("email", value)}
                        />

                        <Input p={2} mt={3} w="100%" bg="muted.200" fontSize={15} borderWidth={2} borderRadius={8} borderColor="muted.400" secureTextEntry={true} placeholder="Password"
                            onChangeText={(value) => handleChangeText("password", value)}
                        />

                        <Button bg="error.500"
                            onPress={(e) => handleSubmit.mutate(e)} _hover={{ backgroundColor: "error.600" }}
                            _text={{ color: "white", fontWeight: "700" }} w="100%" p={2} mt={5}
                        >
                            Login
                        </Button>
                    </FormControl>
                    {/* <Box alignItems="center">
                        <Input
                            value={dataLogin.email}
                            onChangeText={(value) => handleChange("email", value)}
                            type="text"
                            // onChangeText={(text) => setDataLogin({ ...dataLogin, email: text })}
                            mx="3" placeholder="Email" w="100%" mb="2" />
                        <Input
                            value={dataLogin.password}
                            onChangeText={(value) => handleChange("password", value)}
                            type="text"
                            // onChangeText={(text) => setDataLogin({ ...dataLogin, password: text })}
                            mx="3" placeholder="Password" w="100%" mb="2" />
                    </Box>
                </Center>

                <Center w="64" h="10" rounded="md" >
                    <Button
                        onPress={handleLogin}
                        w="100%" h="100%" shadow={3} style={{ marginBottom: 10, marginHorizontal: 50 }} variant='solid' >
                        <Text fontSize="md" style={{ color: 'white', fontWeight: 'bold' }} >
                            Login
                        </Text>
                    </Button> */}
                    <Text onPress={() => navigation.navigate("register")} >
                        New?{" "}
                        <Text style={{ color: "red" }} underline>Register Here</Text>
                    </Text>
                </Center>

            </VStack>
        </>

    )
}
