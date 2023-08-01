import React from "react";
import { View, Text, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./MovieCard";
import { useNavigation } from "@react-navigation/native";

// Responsive Design
const { width, height } = Dimensions.get("window");

// Navigation

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mb-8 mx-4">
      <Text className="text-white text-xl mb-8 mt-8 font-bold">Trending</Text>
      <Carousel
        data={data}
        renderItem={(items) => (
          <MovieCard handleClick={() => handleClick(items)} data={items} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{
          display: "flex",
          alignItems: "center",
        }}
      />
    </View>
  );
};

export default TrendingMovies;
