// Path: ObjectScreen.js
// Description: This is the screen that displays the details of a single object.

import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { queryObjects, insertObject, updateObject, deleteObject } from '../Databases/JumpDB';

export default class ObjectScreen extends React.Component {
    static navigationOptions = {
        title: 'Object',
    };

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            type: '',
            manufacturer: '',
            description: '',
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () => {
            const { navigation } = this.props;
            const id = navigation.getParam('id', '');
            if (id) {
                queryObjects(id, (object) => {
                    this.setState({ id: object.id, name: object.name, type: object.type, manufacturer: object.manufacturer, description: object.description });
                });
            } else {
                this.setState({ id: '', name: '', type: '', manufacturer: '', description: '' });
            }
        });
    }

    saveObject = () => {
        const { id, name, type, manufacturer, description } = this.state;
        if (id) {
            updateObject(id, name, type, manufacturer, description, (result) => {
                if (result.rowsAffected > 0) {
                    this.props.navigation.goBack();
                }
            });
        } else {
            insertObject(name, type, manufacturer, description, (id) => {
                Alert.alert('Object saved with id: ' + id);
            });
        }
    }

    deleteObject = () => {
        deleteObject(id, (result) => {
            if (result.rowsAffected > 0) {
                this.props.navigation.goBack();
            }
        });
    }

    render() {
        const { id, name, type, manufacturer, description } = this.state;
        return (
            <View style={styles.container}>
                <Text>Test Update.  Ok this works 123.</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={(name) => this.setState({ name })}
                    value={name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Type"
                    onChangeText={(type) => this.setState({ type })}
                    value={type}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Manufacturer"
                    onChangeText={(manufacturer) => this.setState({ manufacturer })}
                    value={manufacturer}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    onChangeText={(description) => this.setState({ description })}
                    value={description}
                />
                <Button
                    title="Save Object"
                    onPress={this.saveObject}
                />
                <Button
                    title="Delete Object"
                    onPress={this.deleteObject}
                />
            </View>
        );
    }
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
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
});

