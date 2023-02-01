import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './components/HomePage/HomePage';
import ExercisePage from './components/ExercisePage/ExercisePage';
import SessionPage from './components/SessionPage/SessionPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} options={{ title: 'Scheda' }}/>
        <Stack.Screen name="Exercise" component={ExercisePage} options={({ route }) => ({title: route.params.name})}/>
        <Stack.Screen name="Session" component={SessionPage} options={{ title: 'Allenamento' }}/>
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
});
