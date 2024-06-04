import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { queryJumps, insertJump, updateJump, deleteJump, createDatabaseTables, deleteDatabase, getMaxJumpId } from './Databases/JumpDB';
import HomeScreen from './Screens TS/HomeScreen';
import JumpListFlatList from './Screens TS/JumpListFlatList';
import JumpScreen from './Screens TS/JumpScreen';
//import AddNewJumpScreen from './Screens/AddNewJumpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type Props = {};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(props: Props) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: '' }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="JumpScreen" component={JumpScreen} />
        <Stack.Screen name="JumpListFlatList" component={JumpListFlatList} />
        {/* <Stack.Screen name="AddNewJumpScreen" component={AddNewJumpScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
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
