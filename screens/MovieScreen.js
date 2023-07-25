import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ArrowUturnLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

const { height, width } = Dimensions.get("window");
const ios = Platform.OS == "ios";

// Margin Top
const martop = ios ? "" : "mt-3";

const MovieScreen = () => {
  const { params: items } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cast, setCase] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [similiarMovies, setSimiliarMovies] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  // Loading

  const name = "HELLO THIS IS MOVIE";

  useEffect(() => {
    // Call the APi Details
  }, [items]);

  const MOVIE_HERO = useMemo(() => {
    if (loading) {
      return (
        <View>
          <Image
            source={require("../assets/images/moviePoster2.png")}
            style={{
              width,
              height: height * 0.55,
            }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{ width, height: height * 0.55 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          ></LinearGradient>
        </View>
      );
    }

    if (!loading) {
      return <Loading />;
    }
  }, [loading]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className="flex-1 bg-neutral-900"
    >
      {/* Back button & movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={`absolute z-20 w-full flex-row justify-between items-center px-4 ${martop}`}
        >
          <TouchableOpacity
            className="rounded-xl p-1 flex-row justify-between items-center"
            style={theme.background}
            onPress={() => navigation.goBack()}
          >
            {/* Icon Back */}
            <ArrowUturnLeftIcon size="30" strokeWidth={2} color="white" />
            <Text className="text-white text-1xl font-bold ml-2">Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <HeartIcon
              size="35"
              strokeWidth={2}
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Movie Hero */}
        {MOVIE_HERO}
      </View>

      {/* Movie Details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {name}
        </Text>

        {/* Status, Realese, Runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Realesed * 2020 * 170 min
        </Text>

        {/* Genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action *
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill *
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy *
          </Text>
        </View>

        {/* Description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </View>

      {/* Cast */}
      <Cast cast={cast} navigation={navigation} />

      {/* Similiar Movies */}
      <MovieList
        title="Similiar Movie"
        data={similiarMovies}
        hideSeeAll={true}
      />
    </ScrollView>
  );
};

export default MovieScreen;
