import React from 'react'
import { Tab, Item } from 'react-native-elements';
import { Text } from 'native-base';

export default function TabFooter() {
    const [indexTab, setIndexTab] = React.useState(0);
    return (
        <>
            <Tab value={indexTab} onChange={setIndexTab} dense >
                <Tab.Item>
                    Todo Lists
                </Tab.Item>
                <Tab.Item>Add Lists</Tab.Item>
                <Tab.Item>Add Category</Tab.Item>
            </Tab>
        </>
    )
}
