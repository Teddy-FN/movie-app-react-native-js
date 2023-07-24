import React from "react";
import { TouchableWithoutFeedback, Dimensions, Image } from "react-native";

// Responsive Design
const { width, height } = Dimensions.get("window");

const MovieCard = ({ handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={require("../assets/images/moviePoster1.png")}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
