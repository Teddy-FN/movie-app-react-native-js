import React, { useEffect, useState, useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import Loading from "../components/Loading";
import { IMG_500_SIZE } from "../utils/imgLink";

import { fetchDataPersonDetails } from "../api/moviedb";
import { fetchDataPersonMovies } from "../api/moviedb";
import { fallbackPersonImage } from "../api/moviedb";

const { height, width } = Dimensions.get("window");
const ios = Platform.OS == "ios";

const vertical = ios ? "" : "my-3";

const PersonScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoding] = useState(false);
  const [detailPerson, setDetailPerson] = useState({});
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setLoding(true);
    fetchDataDetailPerson(item.id);
    fetchDataDetailPersonMovies(item.id);
  }, [item]);

  //

  const fetchDataDetailPerson = async (id) => {
    const data = await fetchDataPersonDetails(id);
    if (data.status === 200) {
      setDetailPerson(data.data);
      setLoding(false);
    }
  };

  const fetchDataDetailPersonMovies = async (id) => {
    const data = await fetchDataPersonMovies(id);
    if (data.status === 200) {
      setMovieData(data.data.cast);
      setLoding(false);
    }
  };

  // Loading
  const PERSON_DETAIL_RENDER = useMemo(() => {
    if (loading) {
      return <Loading />;
    }
    if (!loading) {
      return (
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
                source={{
                  uri: detailPerson?.profile_path
                    ? IMG_500_SIZE(detailPerson?.profile_path)
                    : fallbackPersonImage,
                }}
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
              {detailPerson?.name}
            </Text>
          </View>

          {/* identity */}
          <View className="mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-500 rounded-3xl">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {detailPerson?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {detailPerson?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Know for</Text>
              <Text className="text-neutral-300 text-sm">
                {detailPerson?.known_for_department}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {detailPerson?.popularity}
              </Text>
            </View>
          </View>

          {/* Bio */}
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white font-semibold">Biography</Text>
            <Text className="text-neutral-300 tracking-wide text-sm">
              {detailPerson?.biography || "N/A"}
            </Text>
          </View>

          {/* Movie */}
          <MovieList hideSeeAll={true} title="Movie" data={movieData} />
        </View>
      );
    }
  }, [loading, detailPerson]);

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
      {PERSON_DETAIL_RENDER}
    </ScrollView>
  );
};

export default PersonScreen;
