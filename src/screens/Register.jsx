import { NativeBaseProvider, Button, Text, Image, Box, Center, VStack, Input, Link, FormControl } from "native-base"
import { API } from "../config/api";
import React, { useState } from 'react'
import CusHeader from "../Component/Header"
import { useMutation } from "react-query";
import axios from "axios";

export default function Register({ navigation }) {

    const [Form, setForm] = useState({
        firstName: "",
        email: "",
        password: "",
    })

    const handleChange = (name, value) => {
        setForm({
            ...Form,
            [name]: value,
        })
    }


    console.log(Form)
    const handleRegister = useMutation(async (e) => {
        e.preventDefault
        try {
            const body = JSON.stringify(Form)

            const response = await API.post(
                "https://api.kontenbase.com/query/api/v1/30e0c3b4-dccc-4d79-8f07-7adf36304d4b/auth/register",
                {
                    email: Form.email,
                    firstName: Form.firstName,
                    password: Form.password,
                },
                {
                    validateStatus: () => true,
                }
            )

            console.log(response.data);
            // navigation.navigate("login")
            alert("Registration Succeeded")

        } catch (error) {
            // console.log("error register here", error.response.data)
            console.log(error);

            alert(error.data)
        }
    })

    return (

        <>
            <VStack flex="1" space={3} alignItems="center" justifyContent="center">
                <Center rounded="lg"  >
                    <Image source={require('../../assets/login-bg.png')} alt="bg-auth" />
                </Center>

                <Center w="64" rounded="md" >
                    <Text fontSize="2xl" pb="2" bold >
                        Register
                    </Text>
                    <Box alignItems="center">
                        <FormControl>


                            <Input
                                type="text"
                                // onChangeText={(text) => setForm({ ...Form, firstName: text })}
                                onChangeText={(value) => handleChange("firstName", value)}
                                value={Form?.firstName}
                                mx="3" placeholder="Name" w="100%" mb="2" />
                            <Input
                                // onChangeText={(text) => setForm({ ...Form, email: text })}
                                // type="text"
                                onChangeText={(value) => handleChange("email", value)}
                                value={Form?.email}
                                mx="3" placeholder="Email" w="100%" mb="2" />
                            <Input
                                // type="password"
                                // onChangeText={(text) => setForm({ ...Form, password: text })}
                                onChangeText={(value) => handleChange("password", value)}
                                value={Form?.password}
                                mx="3" placeholder="Password" w="100%" mb="2" />
                            <Button
                                //  onPress={handleRegister}
                                onPress={(e) => handleRegister.mutate(e)}
                                w="100%" h="25%" shadow={3} style={{ marginBottom: 10, marginHorizontal: 50 }} variant='solid' >
                                <Text

                                    fontSize="md" style={{ color: 'white', fontWeight: 'bold' }} >
                                    Register
                                </Text>
                            </Button>
                        </FormControl>
                    </Box>
                </Center>

                <Center w="64" h="10" rounded="md" >
                    <Text>
                        Joined us before?{" "}
                        <Text underline onPress={() => navigation.navigate("login")} >Login</Text>
                    </Text>
                </Center>

            </VStack>
        </>
    )
}
