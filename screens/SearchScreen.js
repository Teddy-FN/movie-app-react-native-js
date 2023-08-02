import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Icon
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { debounce } from "lodash";
import { fetchDataSearchMovies } from "../api/moviedb";
import { IMG_500_SIZE } from "../utils/imgLink";
import { fallbackMoviePoster } from "../api/moviedb";

const { height, width } = Dimensions.get("window");

const SearchScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [search] = useState("");
  const [result, setResult] = useState([]);
  const nameMovie = "Movie Name Here Lorem Ipsum";

  const ICONS_SEARCH = useMemo(() => {
    if (search?.length > 1) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
        </TouchableOpacity>
      );
    }
  }, [search]);

  const handleSearch = (e) => {
    if (e && e.length > 2) {
      setLoading(true);
      fetchDataSearchMovies({
        query: e,
        include_adult: false,
        language: "en-US",
        page: 1,
      }).then((response) => {
        if (response.status === 200) {
          setLoading(false);
          console.log("response.data response.data =>", response.data);
          setResult(response.data.results);
        }
      });
    } else {
      setLoading(false);
      setResult([]);
    }
  };

  const handleTextDeBounce = useCallback(debounce(handleSearch, 400), []);

  const RESULT = useMemo(() => {
    if (loading && result.length < 1) {
      return <Loading />;
    }
    if (!loading && result.length > 1) {
      return (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
          className="spalce-y-3"
        >
          <Text className="text-white text-2xl font-semibold ml-1 mb-4">
            Result {`(${result.length})`}
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {result.map((items, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", items)}
                >
                  <View className="space-y-2 mb-2">
                    <Image
                      className="rounded-3xl"
                      source={{
                        uri: items?.poster_path
                          ? IMG_500_SIZE(items?.poster_path)
                          : fallbackMoviePoster,
                      }}
                      style={{
                        height: height * 0.3,
                        width: width * 0.44,
                      }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {items?.original_title?.length > 22
                        ? `${items?.original_title?.slice(0, 22)}....`
                        : items?.original_title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      );
    }

    if (!loading && result.length < 1) {
      return (
        <View className="flex-1 justify-center items-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            style={{
              height: height * 0.6,
              width: width * 0.6,
            }}
          />
          <Text className="text-3xl text-white font-bold">
            Movies Not Found
          </Text>
        </View>
      );
    }
  }, [result, loading]);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDeBounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="p-3 m-1 flex-1 text-base font-semibold text-white tracking-wide"
        />
        {/* Icon Search */}
        {ICONS_SEARCH}
      </View>
      {/* RESULT */}
      {RESULT}
    </SafeAreaView>
  );
};

export default SearchScreen;
