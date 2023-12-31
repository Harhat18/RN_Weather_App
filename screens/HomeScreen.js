import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { theme } from "../theme/index";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});

  const handleLocation = (loc) => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setLoading(false);
      setWeather(data);
      storeData("city", loc.name);
    });
  };

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className="absolute w-full h-full"
      />
      <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%" }} className="mx-4 relative z-50 mt-10">
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch ? (
              <TextInput
                placeholder="Şehir Ara"
                placeholderTextColor={"lightgray"}
                className="pl-6 h-10 pb-1 flex-1 text-base text-white"
              />
            ) : null}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              className="rounded-full p-3 m-1"
              style={{ backgroundColor: theme.bgWhite(0.3) }}
            >
              {showSearch ? (
                <XMarkIcon size="25" color="white" />
              ) : (
                <MagnifyingGlassIcon size="25" color="white" />
              )}
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
              {locations.map((loc, index) => {
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder
                  ? " border-b-2 border-b-gray-400"
                  : "";
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleLocation(loc)}
                    className={
                      "flex-row items-center border-0 p-3 px-4 mb-1 " +
                      borderClass
                    }
                  >
                    <MapPinIcon size="20" color="gray" />
                    <Text className="text-black text-lg ml-2">Londra</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* forecast section */}
        <View className="mx-4 flex justify-around flex-1 mb-2">
          {/* location */}
          <Text className="text-white text-center text-2xl font-bold">
            London,
            <Text className="text-lg font-semibold text-gray-300">
              United Kingdom
            </Text>
          </Text>
          {/* weather icon */}
          <View className="flex-row justify-center">
            <Image
              // source={{uri: 'https:'+current?.condition?.icon}}
              source={require("../assets/images/partlycloudy.png")}
              className="w-52 h-52"
            />
          </View>
          {/* weather icon */}
          <View className="space-y-2 ">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              23&#176;
            </Text>
            <Text className="text-center font-bold text-white text-xl ml-5 tracking-widest">
              Parçalı bulutlu
            </Text>
          </View>
          {/* other stats*/}
          {/* other stats */}
          <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/wind.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">22km</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/drop.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">30%</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/sun.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">6:15</Text>
            </View>
          </View>
          {/* forecast for next days */}
          <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
              <CalendarDaysIcon size="22" color="white" />
              <Text className="text-white text-base">
                Günlük Hava Durumu Tahmini
              </Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              <View
                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-11 h-11"
                />
                <Text className="text-white">Pazatesi</Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
