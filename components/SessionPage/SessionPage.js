import React, { useState } from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native';
import GLOBAL, { currentExercise } from '../../global/global.js'
import YoutubePlayer from "react-native-youtube-iframe"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const styles = StyleSheet.create({
    main: {
        height: "100%"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        height: 50
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    buttonDiv: {
        flex: 1,
        flexDirection: "row",
        width: "auto",
        margin: 20,
        justifyContent: "space-between"
    },
    video: {
        marginHorizontal: 20,
    },
    startDiv: {
        flexDirection: "column",
        width: "auto",
        margin: 20,
        alignItems: "stretch",
    },
    startButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        height: 50
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        padding: 5,
        margin: 20
    },
    timerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    remainingTime: {
        fontSize: 46,
    },
    text: {
        fontSize: 20
    },

})

export default function SessionPage({ navigation, route }) {

    const exercices = route.params.data
    console.log(GLOBAL.currentExercise)

    const [current, setCurrent] = useState(GLOBAL.currentExercise)
    const [rest, setRest] = useState(false)
    const [set, setSet] = useState(1)

    console.log(exercices[current])
    console.log("set:", set)
    console.log("rest:", rest)

    const nextExer = () => {
        if (current < exercices.length -1) {
            setCurrent(current + 1)
            GLOBAL.currentExercise = current + 1
        }
    }

    const prevExer = () => {
        if (current > 0) {
            setCurrent(current - 1)
            GLOBAL.currentExercise = current - 1
        }
    }

    const restClick = () => {
        if (current < exercices.length -1) {
            setRest(exercices[current].rest)
            setSet(set + 1)
            if (set >= exercices[current].sets) {
                setSet(1)
                setCurrent(current + 1)
                GLOBAL.currentExercise = current + 1
            }
        }
    }

    const restCompleted = () => {
        setRest(false)
    }

    const skipRest = () => {
        setRest(false)
    }

    if (rest) return (
        <View style={styles.main}>
            <Text style={styles.title}>
                Riposo
            </Text>

            <View style={styles.timerContainer}>
                <CountdownCircleTimer
                    isPlaying={true}
                    duration={rest}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[rest, rest/2, rest/4, 0]}
                    onComplete={() => restCompleted()}
                >
                    {({ remainingTime }) => <Text style={styles.remainingTime}>{remainingTime}</Text>}
                </CountdownCircleTimer>
            </View>

            <View style={styles.startDiv}>
                <Pressable style={styles.startButton} onPress={skipRest}>
                    <Text style={styles.buttonText}>SALTA</Text>
                </Pressable>
            </View>
        </View>
    )
    else return (
        <View style={styles.main}>
            <Text style={styles.title}>
                {exercices[current].name}
            </Text>

            <View style={styles.video}>
                <YoutubePlayer
                height={200}
                videoId={"iee2TATGMyI"}
                />
            </View>

            <View style={styles.startDiv}>
                <Text style={styles.text}>Serie attuale: {set}</Text>
                <Text style={styles.text}>Ripetizioni: {exercices[current].reps}</Text>
            </View>

            <View style={styles.startDiv}>
                <Pressable style={styles.startButton} onPress={restClick}>
                    <Text style={styles.buttonText}>RIPOSO</Text>
                </Pressable>
            </View>

            <View style={styles.buttonDiv}>
                <Pressable style={styles.button} onPress={prevExer}>
                    <Text style={styles.buttonText}>INDIETRO</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={nextExer}>
                    <Text style={styles.buttonText}>PROSSIMO</Text>
                </Pressable>
            </View>
        </View>
    )
}