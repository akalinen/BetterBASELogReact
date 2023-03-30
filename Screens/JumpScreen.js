// Path: JumpScreen.js
// Description: This screen allows you to add a new jump

import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert } from 'react-native';
import { queryJump, insertJump, updateJump, deleteJump } from '../Databases/JumpDB';

const JumpScreen = () => {
    
    const [jump, setJump] = React.useState({
        jumpNumber: '',
        jumpDate: new Date().toLocaleDateString('en').replace(/\b(\d)\b/g, '0$1'),
        objectName: '',
        objectType: '',
        objectLocation: '',
        delay: '',
        slider: '',
        canopy: '',
        imageURL: 'https://i.imgur.com/BAmkoG4.jpeg',
    });

    const { jumpNumber, jumpDate, objectName, objectType, objectLocation, delay, slider, canopy, imageURL } = jump;

        return (
            <View style={styles.container}>
                <Text>Input new jump:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Date'
                    value={jumpDate}
                    onChangeText={(date) => this.setState({ date })}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Location'
                    value={objectLocation}
                    onChangeText={(location) => this.setState({ location })}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Delay'
                    value={delay}
                    onChangeText={(altitude) => this.setState({ altitude })}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Slider'
                    value={slider}
                    onChangeText={(object_id) => this.setState({ object_id })}
                />
                <Button
                    title='Save'
                    onPress={this.saveJump}
                /> 
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 200,
        height: 40,
        padding: 5,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
});

export default JumpScreen;