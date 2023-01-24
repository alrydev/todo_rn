import { NativeBaseProvider, Button, Text, Image, Box } from "native-base"
import React from 'react'

export default function Homepage({ navigation }) {
    return (
        <>
            <NativeBaseProvider>
                <Box alignItems="center" justifyContent="center" flex="1" style={{ alignItems: 'center' }}>
                    <Image source={require('../../assets/register-bg.png')} style={{ width: 300 }} alt="bg-home" />
                    <Text bold fontSize="5xl" style={{ color: '#0891b2' }}>
                        Ways{" "}
                        <Text style={{ color: '#f43f5e' }} >
                            To
                            <Text style={{ color: '#fb7185' }}>
                                Do
                            </Text>
                        </Text>
                    </Text>
                    <Text>
                        Write your activity and finish your activity.{"\n             "}Fast, Simple, and Easy to Use
                    </Text>
                </Box>
                <Box style={{ marginBottom: 50 }} >
                    <Button onPress={() => navigation.navigate("login")} style={{ marginBottom: 10, marginHorizontal: 50 }} variant='solid' >
                        <Text fontSize="md" style={{ color: 'white', fontWeight: 'bold' }} >
                            Login
                        </Text>
                    </Button>

                    <Button onPress={() => navigation.navigate("register")} style={{ marginBottom: 10, marginHorizontal: 50 }} variant='outline'>
                        <Text fontSize="md" style={{ fontWeight: 'bold' }}>
                            Register
                        </Text>
                    </Button>
                </Box>
            </NativeBaseProvider>
        </>
    )
}
