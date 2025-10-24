import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

const StoreLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderColor: "lightgray",
          borderTopWidth: 3,
          height: 70,
          paddingTop: 5,
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="store"
        options={{
          title: "Store",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "storefront" : "storefront-outline"}
              color={focused ? "black" : "gray"}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addProduct"
        options={{
          title: "Add Product",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "bag-add" : "bag-add-outline"}
              color={focused ? "black" : "gray"}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default StoreLayout;
