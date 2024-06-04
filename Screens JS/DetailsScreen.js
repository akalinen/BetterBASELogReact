import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
    /* 2. Get the param */
    const { itemId, otherParam } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
                title="Go to Details... again"
                onPress={() =>
                    navigation.push('Details', {
                        itemId: itemId + 1,
                        otherParam: 'Updated with ' + itemId + "!",
                    })
                }
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home', { screenText: "Home Body Text \"went back\""})} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}