import { Box, Text, Stack, HStack, Heading, ScrollView, Checkbox, Center, Badge } from 'native-base'
import React from 'react'
import CusHeader from '../Component/Header'

export default function DetailList() {
    return (
        <>
            <CusHeader title="Detail List" />
            <Box my="50" alignItems="center">
                <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "blue.700"
                }} _web={{
                    shadow: 2,
                    borderWidth: 0
                }} _light={{
                    backgroundColor: "blue.50"
                }}>
                    <Box>
                    </Box>
                    <Stack p="5" space={3}>
                        <HStack space={2}>

                            <Heading flex="3" size="md" ml="-1">
                                Study - Golang
                            </Heading>
                            <Box flex="1" justifyContent="center"  >
                                <Badge mb="5" colorScheme="success" rounded="md" >Study</Badge>
                                <Center>
                                    <Checkbox.Group accessibilityLabel="choose values" >
                                        <Checkbox value="one" my={2} />
                                    </Checkbox.Group>
                                </Center>
                            </Box>

                        </HStack>


                        <ScrollView h="500">
                            <Text fontWeight="400">
                                Consequat fugiat enim fugiat sit voluptate voluptate. Commodo et ullamco mollit Lorem exercitation ex. Deserunt sunt eiusmod ea dolore esse est amet magna qui non dolore culpa. Cupidatat ea proident in dolor Lorem laborum. Est sint dolore sit et non aliquip cupidatat nisi aliqua ea exercitation labore esse. Non excepteur Lorem ex quis eu sunt. Enim sit ipsum occaecat amet quis proident ad.
                                {"\n \n "}
                                Mollit culpa ea officia cillum et velit sit ullamco do adipisicing exercitation commodo. Nulla in ex velit velit ullamco occaecat aliqua ipsum labore aute. Voluptate occaecat est elit esse. Do commodo ut pariatur ipsum in elit sit incididunt aliqua commodo do. Laborum occaecat mollit dolor deserunt nostrud incididunt duis.
                                {"\n \n "}
                                Mollit culpa ea officia cillum et velit sit ullamco do adipisicing exercitation commodo. Nulla in ex velit velit ullamco occaecat aliqua ipsum labore aute. Voluptate occaecat est elit esse. Do commodo ut pariatur ipsum in elit sit incididunt aliqua commodo do. Laborum occaecat mollit dolor deserunt nostrud incididunt duis.
                                {"\n \n "}
                                Mollit culpa ea officia cillum et velit sit ullamco do adipisicing exercitation commodo. Nulla in ex velit velit ullamco occaecat aliqua ipsum labore aute. Voluptate occaecat est elit esse. Do commodo ut pariatur ipsum in elit sit incididunt aliqua commodo do. Laborum occaecat mollit dolor deserunt nostrud incididunt duis.
                                {"\n \n "}
                                Mollit culpa ea officia cillum et velit sit ullamco do adipisicing exercitation commodo. Nulla in ex velit velit ullamco occaecat aliqua ipsum labore aute. Voluptate occaecat est elit esse. Do commodo ut pariatur ipsum in elit sit incididunt aliqua commodo do. Laborum occaecat mollit dolor deserunt nostrud incididunt duis.
                                {"\n \n "}
                            </Text>
                        </ScrollView>
                        <HStack alignItems="center" space={4} justifyContent="space-between">
                            <HStack alignItems="center">
                                <Text color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    19 july 2022
                                </Text>
                            </HStack>
                        </HStack>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}
