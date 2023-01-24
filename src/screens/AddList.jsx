import { Button, Text, Box, Center, VStack, Input, Select, CheckIcon, TextArea, Pressable, HStack } from "native-base"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { Ionicons } from '@expo/vector-icons'

import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';


export default function AddList({ navigation }) {

    const [state, dispatch] = useContext(UserContext)

    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [text, setText] = useState("Choose Date")
    const [mode, setMode] = useState("date")

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(false)
        setDate(currentDate)

        const tempDate = new Date(currentDate)
        const formatDate =
            tempDate.getDate() +
            "/" +
            (tempDate.getMonth() + 1) +
            "/" +
            tempDate.getFullYear()
        setText(formatDate)
    }
    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    let { data: category } = useQuery("categoryCaches", async () => {
        let categoryResponse = await API.get("https://api.kontenbase.com/query/api/v1/30e0c3b4-dccc-4d79-8f07-7adf36304d4b/Categories")
        return categoryResponse.data
    })


    const [dataList, setDataList] = useState({
        name: "",
        category: "",
        date: "",
        description: "",
    })


    console.log(dataList);
    function handleChange(name, value) {
        setDataList({
            ...dataList,
            [name]: value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        e.preventDefault()
        try {

            const todoList = {
                Users: [state?.data?.user?._id],
                name: dataList.name,
                date: date,
                description: dataList.description,
                category: dataList.category,
            }

            const response = await API.post("Lists", todoList)

            // listRefetch()
            alert("list added")
            // navigation.navigate("todolist")
        } catch (error) {
            alert(error.message)
        }
    })

    console.log(state);

    const arrayBefore = category
    const stateCategory = state?.data?.user?.categories

    const filteredCategory = arrayBefore?.filter(obj => stateCategory?.includes(obj._id));
    console.log("ini filternya cok", filteredCategory);

    const [service, setService] = React.useState("");
    return (
        <>
            <VStack flex="1" space={3} alignItems="center" justifyContent="center">
                <Center w="64" rounded="md" >

                    <Text fontSize="2xl" pb="2" bold >
                        Add List
                    </Text>
                    <Box alignItems="center">
                        <Input
                            bg={"lightgrey"}
                            value={dataList.name}
                            onChangeText={(value) => handleChange("name", value)}
                            mx="3" placeholder="Name" w="100%" mb="2" mt="3" maxW="300" />

                        <Select
                            defaultValue={dataList.category}
                            onValueChange={(value) => handleChange("category", [value])}
                            bg={"lightgrey"} selectedValue={service} minWidth="300" accessibilityLabel="Choose Service" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1}>
                            {filteredCategory?.map((item, i) => (
                                <Select.Item label={item.name} value={item._id} key={i} />

                            ))}
                        </Select>
                        <TextArea value={dataList.description}
                            onChangeText={(value) => handleChange("description", value)}
                            h={20} bg={"lightgrey"} placeholder="Description" mt="3" w="75%" maxW="300" />
                    </Box>
                </Center>
                <Pressable
                    title="DatePicker"
                    onPress={() => showMode("date")}
                    p={3} paddingX={5} h={46} fontSize={15} borderRadius={8}
                    bg={"lightgrey"}
                    w="73%"
                >
                    <HStack justifyContent="space-between">
                        <Text fontSize="15">{text}</Text>
                        <Text color="blueGray.400">
                            <Ionicons name="calendar-outline" />
                        </Text>
                    </HStack>
                </Pressable>
                {show && (
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        display="default"
                        onChange={onChangeDate}
                    />
                )}

                <Center w="64" h="10" rounded="md" >
                    <Button
                        onPress={(e) => handleSubmit.mutate(e)}
                        w="100%" h="100%" shadow={3} style={{ marginBottom: 10, marginHorizontal: 50 }} variant='solid' >
                        <Text fontSize="md" style={{ color: 'white', fontWeight: 'bold' }} >
                            Add List
                        </Text>
                    </Button>
                </Center>

            </VStack>

        </>
    )
}
