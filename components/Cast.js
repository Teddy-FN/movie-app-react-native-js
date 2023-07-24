import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

const Cast = ({ cast, navigation }) => {
  let personName = "Keanu Reaves";
  let characterName = "John Wick";
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
              <TouchableWithoutFeedback
                key={index}
                className="mx-4 items-center"
                onPress={() => navigation.navigate("Person", item)}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500 mr-5">
                  <Image
                    source={require("../assets/images/castImage1.png")}
                    className="rounded-2xl h-24 w-20"
                  />
                  <Text className="text-white text-xs mt-1">
                    {characterName.length > 10
                      ? `${characterName.slice(0, 10)}....`
                      : characterName}
                  </Text>
                  <Text className="text-neutral-400 text-xs mt-1">
                    {personName.length > 10
                      ? `${personName.slice(0, 10)}....`
                      : personName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
