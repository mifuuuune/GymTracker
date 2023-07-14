import * as React from 'react';
import { Text, View, useWindowDimensions, FlatList, StyleSheet, Pressable } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListElement from './ListElement'
import { getTrainingJson } from './utils'

var schedule = []

const styles = StyleSheet.create({
    tab: {
        backgroundColor: "green"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
      },
      buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
})

export default function HomePage({ navigation }) {

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routeObject, setRouteObject] = React.useState(null)

    const renderItem = ({ item }) => {
        return (
            <ListElement item={item} nav={navigation} />
        )
    }

    var routesArray = []
    var sceneMap = {}
    var routesState = []

    if (routeObject == null) {

        getTrainingJson().then(res => {
            schedule = res
            console.log("SCHEDULE: " + schedule)
            schedule.map((elem, index) => {
    
                const onPress = () => {
                    navigation.navigate('Session', { data: elem.exercises })
                }
    
                var route = () => (
                    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                        <FlatList
                            data={elem.exercises}
                            renderItem={renderItem}
                        />
                        <Pressable style={styles.button} onPress={onPress}>
                            <Text style={styles.buttonText}>INIZIA</Text>
                        </Pressable>
                    </View>
                );
                routesArray.push(route)
                sceneMap['key' + index] = routesArray[index]
                routesState.push({
                    key: 'key' + index,
                    title: elem.day
                })
            })
            setRouteObject({
                routes: routesState,
                renderScene: SceneMap(sceneMap)
            })
        })

        return (
            <View>
                <Text>
                    Attendi...
                </Text>
            </View>
        )
    }

    var routes = routeObject.routes

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={routeObject.renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => <TabBar {...props} style={styles.tab}/>}
        />
    )
}