import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe"

const styles = StyleSheet.create({
  video: {
      marginHorizontal: 20
  },
  title: {
      fontSize: 30,
      textAlign: "center",
      padding: 5
  }
})

export default function ExercisePage({ navigation, route }) {
  return (
    <View>
      <Text style={styles.title}>{route.params.name}</Text>
      <View style={styles.video}>
        <YoutubePlayer
          height={300}
          videoId={"iee2TATGMyI"}
        />
      </View>
    </View>
  );
}