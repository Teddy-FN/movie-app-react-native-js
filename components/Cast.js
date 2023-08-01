import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { fallbackPersonImage } from "../api/moviedb";
import { IMG_500_SIZE } from "../utils/imgLink";

const Cast = ({ cast, navigation }) => {
  return (
    <View className="my-6">
      <Text className="text-white text-xl font-bold mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {cast &&
          cast?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => navigation.navigate("Person", item)}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500 mr-5">
                  <Image
                    source={{
                      uri: item?.profile_path
                        ? `${IMG_500_SIZE(item?.profile_path)}`
                        : fallbackPersonImage,
                    }}
                    className="rounded-2xl h-24 w-20"
                  />
                </View>
                <Text className="text-white text-xs mt-1 mr-4">
                  {item.character.length > 10
                    ? `${item.character.slice(0, 10)}....`
                    : item.character}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1 mr-4">
                  {item.original_name.length > 10
                    ? `${item.original_name.slice(0, 10)}....`
                    : item.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
