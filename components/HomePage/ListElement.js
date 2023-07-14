import * as React from 'react';
import { Text, View, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    main: {
        margin: 2,
        marginLeft: 6,
        marginRight: 6,
        padding: 15,
        backgroundColor: "rgba(51, 153, 51, 0.3);",
        borderColor: "#000",
        borderRadius: 5
    },
    text: {
        fontSize: 20
    }
})

export default function ListElement({ item, nav }) {

    const clickExercise = () => {
        nav.navigate('Exercise', { name: item.name })
    }

    return (
        <TouchableOpacity style={styles.main} onPress={() => clickExercise()}>
            <Text style={styles.text}>{item.name} {item.sets}x{item.reps}</Text>
        </TouchableOpacity>
    )
}