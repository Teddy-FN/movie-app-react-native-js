import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components
import HomeScreen from "../screens/HomeScreen";

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
      </stack.Navigator>
    </NavigationContainer>
  );
};
