import React from "react";
import { View, Dimensions } from "react-native";
import * as Progress from "react-native-progress";
import { color } from "../theme";

const { height, width } = Dimensions.get("window");
const Loading = () => {
  return (
    <View
      style={{
        width,
        height,
      }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={[color.background]}
      />
    </View>
  );
};

export default Loading;
