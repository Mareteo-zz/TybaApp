import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screens/HomeScreen";
import restauransScreens from './Screens/RestaurantsScreen';
import RegisterScreen from './Screens/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
				<Stack.Screen name="Restaurants" component={restauransScreens} options={{ title: 'Encuentra tus restaurantes mas cercanos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
