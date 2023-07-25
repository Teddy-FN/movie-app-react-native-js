import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

const platforms = Platform.OS === "ios";
export default HomeScreen = () => {
  const navigation = useNavigation();
  const [trendingMovies, setTrendingMovies] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  const [upcomingMovies, setUpcomingMovies] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  const [topRatedMovies, setTopRatedMovies] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

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
        {/* ScrollView */}

        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
        >
          {/* Trending */}
          <TrendingMovies data={trendingMovies} />

          {/* Upcoming List */}
          <MovieList
            title="Upcoming"
            data={upcomingMovies}
            hideSeeAll={false}
          />

          {/* Top Rated */}
          <MovieList
            title="Top Rated"
            data={topRatedMovies}
            hideSeeAll={false}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
