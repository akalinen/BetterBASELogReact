import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const JumpScreen = () => {

    const [date, setDate] = useState(new Date());

    const [jump, setJump] = useState<JumpData>({
        id: 0,
        jumpNumber: 1,
        jumpDate: new Date().toLocaleDateString('en').replace(/\b(\d)\b/g, '0$1'),
        objectName: '',
        objectType: '',
        objectLocation: '',
        delay: 3,
        slider: '',
        canopy: '',
        notes: '',
        imageURL: 'https://i.imgur.com/BAmkoG4.jpeg',
        colorHighlight: "",
    });

    const { jumpNumber, jumpDate, objectName, objectType, objectLocation, delay, slider, canopy, notes, imageURL } = jump;

    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>Input new jump:</Text>
            <DateTimePicker
                style={styles.datePickerStyle}
                value={date}
                display="compact"
                accentColor="blue"
                mode="date" //The enum of date, datetime and time
                onChange={(dateIn: any) => setJump({ ...jump, jumpDate: dateIn })}
            />
            <TextInput
                style={styles.input}
                placeholder='Location'
                value={objectLocation}
                onChangeText={(objLocIn) => setJump({ ...jump, objectLocation: objLocIn })}
            />
            <TextInput
                style={styles.input}
                placeholder='Delay'
                value={delay?.toString()}
                onChangeText={(delayIn) => setJump({ ...jump, delay: Number(delayIn) })}
            />
            <TextInput
                style={styles.input}
                placeholder='Slider'
                value={slider}
                onChangeText={(sliderIn) => setJump({ ...jump, slider: sliderIn })}
            />
            <Button
                title='Save'
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
    headerStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: 200,
        height: 40,
        padding: 5,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    datePickerStyle: {
        //width: 230,
        //alignSelf: 'center',
        //backgroundColor: 'white',
    },
});

export default JumpScreen;
