import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Text, VStack, HStack, Center, Box, Avatar, Input, Select, CheckIcon, Stack, Image, Badge, Checkbox, ScrollView, Menu, Pressable, HamburgerIcon } from 'native-base'
import moment from 'moment';

import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';

export default function TodoList({ navigation }) {


    const [state, dispatch] = useContext(UserContext)


    const [service, setService] = React.useState("");

    function handleLogout() {
        AsyncStorage.removeItem("token")
        dispatch({
            type: "LOGOUT_SUCCESS",
        })
        alert("logout")
    }

    let { data: category, refetch: categoryRefetch } = useQuery(
        "categortyCaches",
        async () => {
            let categoryResponse = await API.get("/Categories")
            return categoryResponse.data
        }
    )

    let { data: listData, refetch: listRefetch } = useQuery(
        "listCaches",
        async () => {
            // let listResponse = await API.get("Lists")
            let listResponse = await API.get("Lists?$lookup=category")
            return listResponse.data
        }
    )

    const id = state?.data?.user?._id

    // let { data: user, refetch: userRefetch } = useQuery(
    //     "userCaches",
    //     async () => {
    //         // let listResponse = await API.get("Lists")
    //         let listResponse = await API.get(`Users/${id}?$lookup=*`)
    //         return listResponse.data
    //     }
    // )

    // console.log("user by id aaaaaaaaaaaa", user);



    const arrayBefore = category
    const stateCategory = state?.data?.user?.categories

    const filteredCategory = arrayBefore?.filter(obj => stateCategory?.includes(obj._id));

    // =================================================

    const stateLists = state?.data?.user?.lists
    const arrayListBefore = listData
    const filteredData = arrayListBefore?.filter(item => stateLists?.includes(item._id))
    return (
        <>
            <Box my="4">
                <VStack mx="10" Style={{ backgroundColor: "black" }} space={5} alignItems="center">
                    <Box w="100%" Style={{ width: "100%" }} rounded="md" >
                        <HStack space={130} >
                            <Text w="50%" px="5" py="5" rounded="md" >
                                <Text bold fontSize="2xl" >
                                    Hi {state?.data?.user?.firstName}{"\n "}
                                </Text>
                                <Text>
                                    {filteredData?.length} Lists
                                </Text>
                            </Text>

                            <Box alignItems="center">
                                <Menu mt="9" trigger={triggerProps => {
                                    return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                        <Avatar source={{
                                            uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                        }}>
                                        </Avatar>
                                    </Pressable>;
                                }}>

                                    <Menu.Item >
                                        <Text
                                            onPress={handleLogout}
                                        >

                                            Logout
                                        </Text>
                                    </Menu.Item>
                                </Menu>
                            </Box>
                        </HStack>
                    </Box>

                    <Center >
                        <Input mx="3" placeholder="Seach List ..." w="100%" mb="2" />
                        <HStack space={2} justifyContent="center">
                            <Select minWidth="50%" selectedValue={service} accessibilityLabel="Choose Service" placeholder="Category" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1} onValueChange={itemValue => setService([itemValue])}>

                                {filteredCategory?.map((item, i) => (
                                    <Select.Item label={item.name} value={item._id} key={i} />

                                ))}
                            </Select>
                            <Select minWidth="50%" selectedValue={service} accessibilityLabel="Choose Service" placeholder="Status" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                <Select.Item label="UX Research" value="ux" />
                                <Select.Item label="Web Development" value="web" />
                                <Select.Item label="Cross Platform Development" value="cross" />
                                <Select.Item label="UI Designing" value="ui" />
                                <Select.Item label="Backend Development" value="backend" />
                            </Select>
                        </HStack>
                    </Center>

                </VStack>

                <Box my="30">

                    <VStack space={4} alignItems="center" minWidth="100%" >
                        <ScrollView h="400">

                            {/* {filteredData?.map((item, i) => (
                                // <Select.Item label={item.name} value={item._id} key={i} />
                                <HStack my="3" w="370" space={2} justifyContent="center" bg="blue.100" rounded="md" px="5" py="3">
                                    <Box w="64" h="20" rounded="md" >
                                        <Stack >
                                            <Text bold>
                                                {item.name}
                                            </Text>
                                            <Text h="50" pt="1">
                                                {item.description}
                                            </Text>

                                            <Text h="6" w="50%" >
                                                <Image source={require('../../assets/calendarr.png')} alt="calendar" />
                                                {convertDate(item.date)}
                                            </Text>

                                        </Stack>
                                    </Box>
                                    <Box justifyContent="center"  >
                                        <Badge mb="4" colorScheme="success" rounded="md" >
                                            {item.category.name}
                                        </Badge>
                                        <Center>
                                            <Checkbox.Group accessibilityLabel="choose values" >
                                                <Checkbox colorScheme="green" size="lg" value="one" />
                                            </Checkbox.Group>
                                        </Center>
                                    </Box>
                                </HStack>

                            ))} */}
                            {filteredData?.map((item, i) => {
                                // counter += 1;
                                return (
                                    <HStack
                                        onPress={() => navigation.navigate("detail")}
                                        my="3" w="370" space={2} justifyContent="center" bg="blue.100" rounded="md" px="5" py="3">
                                        <Box w="64" h="20" rounded="md" >
                                            <Stack >
                                                <Text bold>
                                                    {item.name}
                                                </Text>
                                                <Text h="50" pt="1">
                                                    {item.description}
                                                </Text>

                                                <Text h="6" w="50%" >
                                                    <Image source={require('../../assets/calendarr.png')} alt="calendar" />
                                                    {moment(item.date).format("DD MMMM YYYY")}
                                                </Text>
                                            </Stack>
                                        </Box>
                                        <Box justifyContent="center">
                                            <Box justifyContent="center"  >
                                                {/* {filteredCategory?.length > ( */}
                                                <Badge mb="4" colorScheme="success" rounded="md" >
                                                    {item.category[0].name}
                                                </Badge>
                                                {/* )} */}
                                                <Center>
                                                    <Checkbox.Group accessibilityLabel="choose values" >
                                                        <Checkbox colorScheme="green" size="lg" value="one" />
                                                    </Checkbox.Group>
                                                </Center>
                                            </Box>
                                        </Box>
                                    </HStack>
                                );
                            })}





                            {/* ============ */}

                            {/* <HStack my="3" w="370" space={2} justifyContent="center" bg="red.100" rounded="md" px="5" py="3">
                                <Box w="64" h="20" rounded="md" >
                                    <Stack >
                                        <Text bold>
                                            Home Work - Math
                                        </Text>
                                        <Text h="50" pt="1">
                                            Do Homework Math Probability
                                        </Text>

                                        <Text w="50%" h="6" >
                                            <Image source={require('../../assets/calendarr.png')} alt="calendar" />
                                            19 July 2022
                                        </Text>

                                    </Stack>
                                </Box>
                                <Box justifyContent="center"  >
                                    <Badge mb="4" colorScheme="warning" rounded="md" >HomeWork</Badge>
                                    <Center>
                                        <Checkbox.Group accessibilityLabel="choose values" >
                                            <Checkbox colorScheme="green" size="lg" value="one" my={2} />
                                        </Checkbox.Group>
                                    </Center>
                                </Box>
                            </HStack>

                            <HStack my="3" w="370" space={2} justifyContent="center" bg="warning.100" rounded="md" px="5" py="3">
                                <Box w="64" h="20" rounded="md" >
                                    <Stack >
                                        <Text bold>
                                            Study - Javascript
                                        </Text>
                                        <Text h="50" pt="1">
                                            Learn javascript to improve fundamentals and familirize with coding
                                        </Text>

                                        <Text w="50%" h="6" >
                                            <Image source={require('../../assets/calendarr.png')} alt="calendar" />
                                            19 July 2022
                                        </Text>

                                    </Stack>
                                </Box>
                                <Box justifyContent="center"  >
                                    <Badge mb="4" colorScheme="success" rounded="md" >Study</Badge>
                                    <Center>
                                        <Checkbox.Group accessibilityLabel="choose values" >
                                            <Checkbox colorScheme="green" size="lg" value="one" my={2} />
                                        </Checkbox.Group>
                                    </Center>
                                </Box>
                            </HStack>

                            <HStack my="3" w="370" space={2} justifyContent="center" bg="warning.100" rounded="md" px="5" py="3">
                                <Box w="64" h="20" rounded="md" >
                                    <Stack >
                                        <Text bold>
                                            Study - Javascript
                                        </Text>
                                        <Text h="50" pt="1">
                                            Learn javascript to improve fundamentals and familirize with coding
                                        </Text>
                                        <Text w="50%" h="6" >
                                            <Image source={require('../../assets/calendarr.png')} alt="calendar" />
                                            19 July 2022
                                        </Text>

                                    </Stack>
                                </Box>

                                <Box justifyContent="center"  >
                                    <Badge mb="4" colorScheme="success" rounded="md" >Study</Badge>
                                    <Center>
                                        <Checkbox.Group accessibilityLabel="choose values" >
                                            <Checkbox colorScheme="green" size="lg" value="one" my={2} />
                                        </Checkbox.Group>
                                    </Center>
                                </Box>
                            </HStack>

                            <HStack my="3" w="370" space={2} justifyContent="center" bg="warning.100" rounded="md" px="5" py="3">
                                <Box w="64" h="20" rounded="md" >
                                    <Stack >
                                        <Text bold>
                                            Study - Javascript
                                        </Text>
                                        <Text h="50" pt="1">
                                            Learn javascript to improve fundamentals and familirize with coding
                                        </Text>

                                        <Text w="50%" h="6" >
                                            <Image source={require('../../assets/calendarr.png')} alt="calendar" />
                                            19 July 2022
                                        </Text>

                                    </Stack>
                                </Box>
                                <Box justifyContent="center"  >
                                    <Badge mb="4" colorScheme="success" rounded="md" >Study</Badge>
                                    <Center>
                                        <Checkbox.Group accessibilityLabel="choose values" >
                                            <Checkbox colorScheme="green" size="lg" value="one" my={2} />
                                        </Checkbox.Group>
                                    </Center>
                                </Box>
                            </HStack>

                            <HStack my="3" w="370" space={2} justifyContent="center" bg="warning.100" rounded="md" px="5" py="3">
                                <Box w="64" h="20" rounded="md" >
                                    <Stack >
                                        <Text bold>
                                            Study - Javascript
                                        </Text>
                                        <Text h="50" pt="1">
                                            Learn javascript to improve fundamentals and familirize with coding
                                        </Text>

                                        <Text w="50%" h="6" >
                                            <Image source={require('../../assets/calendarr.png')} alt="calendar" />
                                            19 July 2022
                                        </Text>

                                    </Stack>
                                </Box>
                                <Box justifyContent="center"  >
                                    <Badge mb="4" colorScheme="success" rounded="md" >Study</Badge>
                                    <Center>
                                        <Checkbox.Group accessibilityLabel="choose values" >
                                            <Checkbox colorScheme="green" size="lg" value="one" my={2} />
                                        </Checkbox.Group>
                                    </Center>
                                </Box>
                            </HStack> */}

                        </ScrollView>




                    </VStack>
                </Box>
            </Box >

        </>
    )
}
