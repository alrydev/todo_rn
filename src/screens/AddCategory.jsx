import { NativeBaseProvider, Button, Text, Image, Box, Center, VStack, Input, Link, Select, CheckIcon, TextArea, HStack, Badge } from "native-base"

import { API } from "../config/api"
import React, { useState } from 'react'
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { } from 'react-native'
import { useQuery, useMutation } from "react-query"


export default function AddCategory() {
    const [state, dispatch] = useContext(UserContext)

    let { data: category, refetch: categoryRefetch } = useQuery(
        "categortyCaches",
        async () => {
            let categoryResponse = await API.get("https://api.kontenbase.com/query/api/v1/30e0c3b4-dccc-4d79-8f07-7adf36304d4b/Categories?$lookup=*")
            return categoryResponse.data
        }
    )
    const [dataCategory, setDataCategory] = useState({
        name: "",
        Users: [state?.data?.user?._id]
    })
    console.log(dataCategory)

    function handleChange(name, value) {
        setDataCategory({
            ...dataCategory,
            [name]: value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        e.preventDefault()
        try {
            const response = await API.post("Categories", dataCategory)

            alert("category added")
            // alert(response);
            categoryRefetch()
        } catch (error) {
            console.log("error category", error.message);
            alert(error)
        }
    })


    // const randomColor = () => {
    //     const r = Math.floor(Math.random() * 160 + 160);
    //     const g = Math.floor(Math.random() * 160 + 160);
    //     const b = Math.floor(Math.random() * 160 + 160);
    //     return `rgba(${r}, ${g}, ${b}, 1)`;
    // };

    // console.log("ini category cok", category);
    // console.log("ini state", state?.data?.user?.categories);
    const arrayBefore = category
    const stateCategory = state?.data?.user?.categories

    const filteredCategory = arrayBefore?.filter(obj => stateCategory?.includes(obj._id));
    // console.log("ini filternya cok", filteredCategory);
    // console.log("HANCOKKKKKKKK", category);
    return (

        <>
            <VStack flex="2" space={3} alignItems="center" justifyContent="center">
                <Center w="64" rounded="md" >
                    <Text fontSize="2xl" pb="2" bold >
                        Add Category
                    </Text>
                    <Box alignItems="center">
                        <Input
                            pe="text"
                            value={dataCategory.name}
                            type="text"
                            onChangeText={(value) => handleChange("name", value)}
                            mx="3" placeholder="Name" w="100%" mb="2" mt="3" maxW="300" />
                    </Box>
                    <Button
                        onPress={(e) => handleSubmit.mutate(e)}
                        w="250" my="3" shadow={3} style={{ marginBottom: 10, marginHorizontal: 50 }} variant='solid' >
                        <Text fontSize="md" style={{ color: 'white', fontWeight: 'bold' }} >
                            Add Category
                        </Text>
                    </Button>
                </Center>



            </VStack>
            <Box flex="3" mx="5" >
                <Text fontSize="2xl" bold pb="5">
                    List Category
                </Text>
                <HStack flexWrap={"wrap"} space={{
                    base: 2,
                    sm: 5
                }} mx={{
                    base: "auto",
                    md: 0
                }}>
                    {filteredCategory?.map((item, i) => {
                        return (
                            <Badge my="2"
                                colorScheme="success"
                            >
                                <Text fontSize="md">
                                    {item.name}
                                </Text>
                            </Badge>

                        )
                    })}
                    {/* <Badge colorScheme="danger">Homework</Badge>
                    <Badge colorScheme="info">Workout</Badge>
                    <Badge colorScheme="coolGray">Coding</Badge> */}
                </HStack>

            </Box>
        </>
    )
}
