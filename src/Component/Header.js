import React from 'react';
import { StyleSheet } from 'react-native'
import { Header, Tab } from 'react-native-elements';

const CusHeader = (props) => {
    const [indexTab, setIndexTab] = React.useState(0);
    return (
        <>
            <Header
                placement="start"
                centerComponent={{ text: props.title, style: { color: '#FFF', fontWeight: 'bold' } }}
            >
            </Header>
        </>
    )
}

export default CusHeader

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginTop: 40,
        borderBottomWidth: 1
    },

    title: {
        fontSize: 16,
        color: 'gray'
    }
})