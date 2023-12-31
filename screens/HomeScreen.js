import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";

import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

// Component

import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";

// Fetching Data
import { fetchDataTrendingMovies } from "../api/moviedb";
import { fetchDataUpcomingMovies } from "../api/moviedb";
import { fetchDataTopRatedMovies } from "../api/moviedb";
import { fetchDataPopularMovies } from "../api/moviedb";

const platforms = Platform.OS === "ios";
export default HomeScreen = () => {
  const navigation = useNavigation();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  // Loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchDataTrending();
    fetchDataUpcoming();
    fetchDataTopRated();
    fetchDataPopular();
  }, []);

  // Function FetchData
  const fetchDataTrending = async () => {
    const data = await fetchDataTrendingMovies();
    if (data?.status === 200) {
      setLoading(false);
      setTrendingMovies((prevState) => [...prevState, ...data.data.results]);
    }
  };

  const fetchDataPopular = async () => {
    const data = await fetchDataPopularMovies();
    if (data.status === 200) {
      setLoading(false);
      setPopularMovies((prevState) => [...prevState, ...data.data.results]);
    }
  };

  const fetchDataUpcoming = async () => {
    const data = await fetchDataUpcomingMovies();
    if (data?.status === 200) {
      setLoading(false);
      setUpcomingMovies((prevState) => [...prevState, ...data.data.results]);
    }
  };

  const fetchDataTopRated = async () => {
    const data = await fetchDataTopRatedMovies();
    if (data?.status === 200) {
      setLoading(false);
      setTopRatedMovies((prevState) => [...prevState, ...data.data.results]);
    }
  };

  const MOVIES_LIST = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (!loading) {
      return (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
        >
          {/* Trending */}
          {trendingMovies.length > 0 && (
            <TrendingMovies data={trendingMovies} />
          )}

          {/* Popular */}
          {popularMovies.length > 0 && (
            <MovieList
              title="Popular"
              data={popularMovies}
              hideSeeAll={false}
            />
          )}

          {/* Upcoming List */}
          {upcomingMovies.length > 0 && (
            <MovieList
              title="Upcoming"
              data={upcomingMovies}
              hideSeeAll={false}
            />
          )}

          {/* Top Rated */}
          {topRatedMovies.length > 0 && (
            <MovieList
              title="Top Rated"
              data={topRatedMovies}
              hideSeeAll={false}
            />
          )}
        </ScrollView>
      );
    }
  }, [loading, trendingMovies, upcomingMovies, topRatedMovies]);

  return (
    <View className="flex-1 bg-neutral-800">
      {/* Search bar & Logo */}
      <SafeAreaView className={platforms ? "mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3BottomLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={theme.text}>M</Text>
            ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>

        {/* Movie list */}
        {MOVIES_LIST}
      </SafeAreaView>
    </View>
  );
};
