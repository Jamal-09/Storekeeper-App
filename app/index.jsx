import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white px-8">
      <Text className="text-3xl text-center font-extrabold">
        Welcome to the Storekeeper App 📃
      </Text>
      <Text className="my-4 text-xl text-center">
        Manage your product inventory efficiently with a simple and intuitive
        interface.
      </Text>
      <TouchableOpacity
        className="bg-green-700 px-4 py-2 rounded-full"
        onPress={() => router.push("/store")}
      >
        <Text className="text-xl font-bold color-white">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
