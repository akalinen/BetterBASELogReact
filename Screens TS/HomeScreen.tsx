import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="TYPESCRIPT SCREEN"
                onPress={() => {
                    navigation.navigate('JumpListFlatList');
                }}
            />
            <Button
                title="JumpScreen"
                onPress={() => {
                    navigation.navigate('JumpScreen');
                }}
            />
        </View>
    );
};

export default HomeScreen;
