import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const Store = () => {
  const db = useSQLiteContext();
  const router = useRouter();
  const [products, setProducts] = useState([]);

  // Fetch products from the database
  const fetchProducts = async () => {
    try {
      const result = await db.getAllAsync(
        "SELECT * FROM products ORDER BY createdAt DESC;"
      );
      setProducts(result);
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
    }
  };

  // Refresh products when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/productDetails",
          params: { id: item.id },
        })
      }
      className="flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm"
    >
      {item.imageUri ? (
        <Image
          source={{ uri: item.imageUri }}
          className="w-16 h-16 rounded-xl mr-4"
        />
      ) : (
        <View className="w-16 h-16 bg-gray-200 rounded-xl mr-4 items-center justify-center">
          <Text className="text-gray-500 text-xs text-center">No Image</Text>
        </View>
      )}

      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-900">{item.name}</Text>
        <Text className="text-sm text-gray-500">Quantity: {item.quantity}</Text>
        <Text className="text-sm text-gray-700 font-medium">
          ₦{item.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold mb-4 text-gray-900">
        Product Inventory
      </Text>

      {products.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No products found</Text>
          <TouchableOpacity
            onPress={() => router.push("/(store)/addProduct")}
            className="mt-4 bg-blue-600 py-3 px-6 rounded-full"
          >
            <Text className="text-white font-medium">Add Product</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity
        onPress={() => router.push("/(store)/addProduct")}
        className="absolute bottom-8 right-8 bg-blue-600 w-16 h-16 rounded-full items-center justify-center shadow-lg"
      >
        <Text className="text-white text-3xl">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Store;
