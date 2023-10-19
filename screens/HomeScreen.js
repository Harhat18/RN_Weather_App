import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { theme } from "../theme/index";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
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
                placeholder="Search city"
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
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
