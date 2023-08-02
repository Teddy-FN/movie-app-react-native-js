import React from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";

// Responsive Design
const { width, height } = Dimensions.get("window");
import { IMG_500_SIZE } from "../utils/imgLink";
import { fallbackMoviePoster } from "../api/moviedb";

const MovieList = ({ title, data, hideSeeAll }) => {
  console.log("DATA MOVIE LIST BRAY =>", data);
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl font-bold">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={theme.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Movie Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {data?.map((items, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("Movie", items)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={{
                    uri: items?.poster_path
                      ? `${IMG_500_SIZE(items?.poster_path)}`
                      : fallbackMoviePoster,
                  }}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-300 ml-1">
                  {items.original_title?.length > 14
                    ? `${items.original_title?.slice(0, 14)}....`
                    : items.original_title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
