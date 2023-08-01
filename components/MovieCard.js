import React from "react";
import { TouchableWithoutFeedback, Dimensions, Image } from "react-native";

// Responsive Design
const { width, height } = Dimensions.get("window");
import { IMG_500_SIZE } from "../utils/imgLink";
import { fallbackMoviePoster } from "../api/moviedb";

const MovieCard = ({ handleClick, data }) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={{
          uri: data?.item?.backdrop_path
            ? `${IMG_500_SIZE(data?.item?.backdrop_path)}`
            : fallbackMoviePoster,
        }}
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
