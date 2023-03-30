import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ route, navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title='Example Jump Flat List'
                onPress={() => {
                    navigation.navigate('JumpListFlatList');
                }}
            />
            <Button title='JumpScreen'
                onPress={() => {
                    navigation.navigate('JumpScreen');
                }}
            />
        </View>
    );
}