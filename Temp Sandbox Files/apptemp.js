import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { queryJumps, insertJump, updateJump, deleteJump, createDatabaseTables, deleteDatabase, getMaxJumpId } from '../Databases/JumpDB';

export default function App() {
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [altitude, setAltitude] = useState('');
    const [object_id, setObject_id] = useState('');
    const [del_id, setDel_id] = useState('');

    const saveJump = () => {
        createDatabaseTables();
        insertJump(date, location, altitude, object_id, (id) => {
            console.log('App.js: Jump saved with id: ' + id);
        });
        queryJumps((result) => {
            console.log('App.js saveJump_queryJumps: \n' + JSON.stringify(result).replace(/},/g, '},\n'));
        });
        update_Object_id();
    }

    const deleteDb = () => {
        deleteDatabase((result) => {
            console.log('App.js: Database deleted with result ' + result);
        });
        update_Object_id();
    }

    const delete_Jump = (id) => {
        deleteJump(id, (result) => {
            console.log('App.js delete_Jump:' + result);
            query_Jumps();
        });
        update_Object_id();
    }

    const query_Jumps = () => {
        queryJumps((result) => {
            console.log('App.js query_Jumps: \n' + JSON.stringify(result).replace(/},/g, '},\n'));
        });
        update_Object_id();
    }

    const update_Object_id = () => {
        getMaxJumpId((result) => {
            //console.log('App.js update_Object_id: ' + (result));
            if (isNaN(result)) {
                setObject_id("1Obj");
                setDate("1Date");
                setAltitude("1Alt");
                setLocation("1Loc");
            } else {
            setObject_id((result+1) + "Obj");
            setDate((result+1) + "Date");
            setAltitude((result+1) + "Alt");
            setLocation((result+1) + "Loc");
            }
        });
    }
                
    return (
        
<View style={styles.container}>
            <Text>Database Testing Tool</Text>
            <TextInput
                style={styles.input}
                placeholder="Date"
                onChangeText={setDate}
                value={date}
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                onChangeText={setLocation}
                value={location}
            />
            <TextInput
                style={styles.input}
                placeholder="Altitude"
                onChangeText={setAltitude}
                value={altitude}
            />
            <TextInput
                style={styles.input}
                placeholder="Object ID"
                onChangeText={setObject_id}
                value={object_id}
            />
            <Button
                title="Save Jump"
                //run both saveJump and update_Object_id functions when the button is pressed
                onPress={saveJump}
                //onPress={saveJump}
            />

            <TextInput
                style={styles.input}
                placeholder="Delete ID"
                onChangeText={setDel_id}
                value={del_id}
            />

            <Button
                title="Delete Jump"
                onPress={() => delete_Jump(del_id)}
            />
            <Button
                title="Delete Database"
                onPress={deleteDb}
            />
            <Button
                title="Query Jumps"
                onPress={query_Jumps}
            />

            <Button
                title="Jump"
                onPress={() => navigation.navigate('Jump')}
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
        borderColor: 'gray',
        borderWidth: 1,
        margin: 8,
    },
});