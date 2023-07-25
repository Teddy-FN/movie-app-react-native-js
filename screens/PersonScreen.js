import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import MovieList from "../components/MovieList";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { ArrowUturnLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

const { height, width } = Dimensions.get("window");
const ios = Platform.OS == "ios";

const vertical = ios ? "" : "my-3";

const PersonScreen = () => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [movieData, setMovieData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      {/* Back Button */}
      <SafeAreaView
        className={`z-20 w-full flex-row justify-between items-center px-4 ${vertical}`}
      >
        <TouchableOpacity
          className="rounded-xl p-1 flex-row justify-start items-center"
          style={theme.background}
          onPress={() => navigation.goBack()}
        >
          <ArrowUturnLeftIcon color="white" size="30" strokeWidth={2} />
          <Text className="text-white text-1xl font-bold ml-2">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <HeartIcon
            size="35"
            strokeWidth={2}
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Person Details */}
      <View>
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border border-neutral-500">
            <Image
              source={require("../assets/images/castImage2.png")}
              style={{
                height: height * 0.43,
                width: width * 0.74,
              }}
            />
          </View>
        </View>

        {/* Name & Places */}
        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            Keanu Reves
          </Text>
          <Text className="text-base text-white font-bold text-center">
            London, United Kingdom
          </Text>
        </View>

        {/* identity */}
        <View className="mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-500 rounded-3xl">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 text-sm">Gender</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">20-20-2020</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Know for</Text>
            <Text className="text-neutral-300 text-sm">Acting</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">63.43</Text>
          </View>
        </View>

        {/* Bio */}
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white font-semibold">Biography</Text>
          <Text className="text-neutral-300 tracking-wide text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>

        {/* Movie */}
        <MovieList hideSeeAll={true} title="Movie" data={movieData} />
      </View>
    </ScrollView>
  );
};

export default PersonScreen;
