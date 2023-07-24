import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";

const stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <stack.Screen
          name="Movie"
          options={{ headerShown: false }}
          component={MovieScreen}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};
