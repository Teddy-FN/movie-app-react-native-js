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
import {
  fetchDataCreditMovieDetails,
  fetchDataMovieDetails,
  fetchDataSimiliarMovieDetails,
} from "../api/moviedb";
import { IMG_500_SIZE } from "../utils/imgLink";
import { fallbackMoviePoster } from "../api/moviedb";

const { height, width } = Dimensions.get("window");
const ios = Platform.OS == "ios";

// Margin Top
const martop = ios ? "" : "mt-3";

const MovieScreen = () => {
  const { params: items } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [cast, setCase] = useState([]);
  const [similiarMovies, setSimiliarMovies] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (items?.item?.id || items?.id) {
      fetchDataDetail(items?.item?.id || items?.id);
      fetchDataCreditDetail(items?.item?.id || items?.id);
      fetchDataSimiliarMoviesDetail(items?.item?.id || items?.id);
    }
    // Call the APi Details
  }, [items]);

  const fetchDataDetail = async (id) => {
    const data = await fetchDataMovieDetails(id);
    if (data.status === 200) {
      setLoading(false);
      setDataDetail(data.data);
    }
  };

  const fetchDataCreditDetail = async (id) => {
    const data = await fetchDataCreditMovieDetails(id);
    if (data.status === 200) {
      setCase(data.data.cast);
    }
  };

  const fetchDataSimiliarMoviesDetail = async (id) => {
    const data = await fetchDataSimiliarMovieDetails(id);
    if (data.status === 200) {
      setSimiliarMovies(data.data.results);
    }
  };

  const MOVIE_HERO = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (!loading) {
      return (
        <View>
          <Image
            source={{
              uri: dataDetail.poster_path
                ? IMG_500_SIZE(dataDetail.poster_path)
                : fallbackMoviePoster,
            }}
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
  }, [loading, dataDetail]);

  const MOVIE_DETAILS = useMemo(() => {
    if (!loading) {
      return (
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            {dataDetail?.original_title}
          </Text>

          {/* Status, Realese, Runtime */}
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {dataDetail.release_date} * {dataDetail.runtime} min
          </Text>

          {/* Genres */}
          <View className="flex-row justify-center mx-4 space-x-2">
            {dataDetail?.genres?.map((items, index) => {
              return (
                <Text
                  className="text-neutral-400 font-semibold text-base text-center"
                  key={index}
                >
                  {items.name} *
                </Text>
              );
            })}
          </View>

          {/* Description */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
            {dataDetail.overview}
          </Text>
        </View>
      );
    }
  }, [loading, dataDetail]);

  const CAST_MOVIE_DETAILS = useMemo(() => {
    if (!loading) {
      return <Cast cast={cast} navigation={navigation} />;
    }
  }, [loading, cast, navigation]);

  const SIMILIAR_MOVIE_DETAILS = useMemo(() => {
    if (!loading) {
      return (
        <MovieList
          title="Similiar Movie"
          data={similiarMovies}
          hideSeeAll={true}
        />
      );
    }
  }, [loading, similiarMovies]);

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
      {MOVIE_DETAILS}

      {/* Cast */}
      {CAST_MOVIE_DETAILS}

      {/* Similiar Movies */}
      {SIMILIAR_MOVIE_DETAILS}
    </ScrollView>
  );
};

export default MovieScreen;
