import React from "react"
import { StyleSheet, Image, Text, View } from "react-native"
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const JumpListItem = ({ jump }) => {

  const backgroundColor = jump.colorHighlight

  return (
    <View style={[styles.JumpListItemStyle, { backgroundColor }]}>
      <View style={styles.LeftGroupStyle}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.JumpNumber}>{jump.jumpNumber}</Text>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.DateText}>{jump.jumpDate}</Text>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.objTypeNum}>{jump.objectType} #XXXX</Text>
      </View>
      <View style={styles.DetailTextGroupStyle}>
        <Text numberOfLines={1} style={styles.ObjectNameStyle}>{jump.objectName} (100/100)</Text>
        <Text numberOfLines={1} style={styles.ObjectLocationStyle}>{jump.objectLocation}</Text>
        <Text numberOfLines={1} style={styles.DelayTextStyle}>
          {jump.delay != "" ? "Delay: " + jump.delay + "s" : ''} 
          {jump.delay != "" && jump.slider != "" ? " - " : ''}
          {jump.slider != "" ? jump.slider  : ''}</Text>
        <Text numberOfLines={1} style={styles.NotesStyle1}>{jump.notes}</Text>
      </View>
      <Image style={styles.ImageJumpStyle} source={{uri: jump.imageURL}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  // ------------ TOP LEVEL CONTAINER ------------
  JumpListItemStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.99,
    height: 75,
    paddingRight: 1,
    paddingBottom: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    boxSizing: "border-box",
    backgroundColor: "rgba(255,255,255,1)",
  },
  // ------------ LEFT GROUP CONTAINER ------------
  LeftGroupStyle: {
    display: "flex",
    flexDirection: "column",
    flex: 1.15,
    alignItems: "center",
    height: "100%",
    paddingLeft: 2,
    paddingRight: 5,
    boxSizing: "border-box",
    borderRightWidth: 0.5,
  },
  JumpNumber: {
    flex: 3,
    textAlign: "center",
    fontFamily: "Georgia",
    color: "rgba(0,0,200,1)",
    textShadowColor: 'rgba(0, 0, 100, .25)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontWeight: "bold",
    fontSize: 30,
  },
  DateText: {
    flex: 2,
    //maxHeight: "30%",
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    fontFamily: "Georgia",
    fontWeight: "bold",
    textAlign: "center",
  },
  objTypeNum: {
    flex: 1.25,
    //maxHeight: "20%",
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    fontFamily: "Georgia",
    textAlign: "center",
  },
  // ------------ MIDDLE GROUP (DETAIL) CONTAINER ------------
  DetailTextGroupStyle: {
    display: "flex",
    flexDirection: "column",
    flex: 4.5,
    //height: "100%",
    paddingTop: 5,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 3,
    //boxSizing: "border-box",
    //borderRightWidth: 1,
  },
  ObjectNameStyle: {
    //flex: 1,
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    fontFamily: "Georgia",
    fontWeight: "bold",
  },
  ObjectLocationStyle: {
    //flex: 1,
    fontSize: 14,
    color: "rgba(0,0,0,1)",
    fontFamily: "Georgia",
  },
  DelayTextStyle: {
    //flex: 1,
    fontSize: 12,
    color: "rgba(0,0,0,1)",
    fontFamily: "Georgia",
  },
  NotesStyle1: {
    //flex: 1,
    fontSize: 12,
    paddingTop: 2,
    color: "rgba(0,0,0,1)",
    fontFamily: "Georgia",
    fontStyle: "italic",
  },
  // ------------ IMAGE CONTAINER ------------
  ImageJumpStyle: {
    flex: 1,
    height: "100%",
    resizeMode: "contain",
  },
})

export default JumpListItem;