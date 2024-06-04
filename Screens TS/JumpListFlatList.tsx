import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import JumpListItem from './JumpListItem';

const JumpList = () => {
  const [jumps, setJumps] = useState<JumpData[]>([
    {
      id: 1,
      jumpNumber: 265,
      colorHighlight: "rgba(255,0,0,0.25)",
      jumpDate: "11/03/84",
      objectName: "Yellow Ocean",
      objectType: 'B',
      objectLocation: "Typescript, Switzerland",
      delay: 4,
      slider: "Slider Down",
      canopy: 'Sabre2 170',
      notes: 'Really long notes that will wrap to the next line',
      imageURL: 'https://i.imgur.com/BAmkoG4.jpeg',
    },
    {
      id: 2,
      jumpNumber: 50,
      colorHighlight: 'white',
      jumpDate: "12/31/35",
      objectName: "High Ultimate",
      objectType: 'A',
      objectLocation: "The place next to the other place",
      delay: 6,
      slider: "Slider Up",
      canopy: 'Valkyrie 79',
      notes: '',
      imageURL: "https://i.imgur.com/md0fpTa.jpeg",
    },
    {
      id: 3,
      jumpNumber: 9999,
      colorHighlight: "rgba(100,100,0,0.25)",
      jumpDate: "01/12/60",
      objectName: "Unholy Matrimadsfadony",
      objectLocation: "Paris France",
      objectType: 'S',
      slider: "Slider Off",
      canopy: 'Pulse 190',
      notes: 'Fun jump!',
      imageURL: "https://i.imgur.com/QMHYVUh.gif",
    },
    {
      id: 4,
      jumpNumber: 1,
      colorHighlight: 'white',
      jumpDate: "01/12/60",
      objectName: "Normal exit name",
      objectLocation: "Moab, United States",
      objectType: 'S',
      delay: 3,
      slider: "",
      canopy: 'Pulse 190',
      notes: 'Another really \n test test',
      imageURL: "https://i.imgur.com/7s5YPal.jpeg",
    },
  ]);

  const renderItem = ({ item }: { item: JumpData }) => <JumpListItem jump={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jump Log</Text>
      <FlatList
        data={jumps}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default JumpList;
