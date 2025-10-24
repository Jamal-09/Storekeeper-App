import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const router = useRouter();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const result = await db.getAllAsync(
        "SELECT * FROM products WHERE id = ?;",
        [id]
      );
      if (result.length > 0) setProduct(result[0]);
    };
    loadProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await db.runAsync(
        `UPDATE products SET name = ?, quantity = ?, price = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?;`,
        [product.name, product.quantity, product.price, id]
      );
      alert("✅ Product updated!");
      router.back();
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await db.runAsync("DELETE FROM products WHERE id = ?;", [id]);
            alert("🗑️ Product deleted!");
            router.back();
          },
        },
      ]
    );
  };

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <ScrollView className="flex-1 bg-white p-5">
        <Text className="text-2xl font-bold mb-6 text-gray-800">
          Edit Product
        </Text>

        {product.imageUri && (
          <Image
            source={{ uri: product.imageUri }}
            className="w-full h-56 rounded-xl mb-6"
            resizeMode="cover"
          />
        )}

        <Text className="text-gray-600 mb-2">Product Name</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
          value={product.name}
          onChangeText={(text) => setProduct({ ...product, name: text })}
        />

        <Text className="text-gray-600 mb-2">Quantity</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
          value={String(product.quantity)}
          keyboardType="numeric"
          onChangeText={(text) =>
            setProduct({ ...product, quantity: parseInt(text) || 0 })
          }
        />

        <Text className="text-gray-600 mb-2">Price (₦)</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
          value={String(product.price)}
          keyboardType="numeric"
          onChangeText={(text) =>
            setProduct({ ...product, price: parseFloat(text) || 0 })
          }
        />

        <TouchableOpacity
          onPress={handleUpdate}
          className="bg-green-600 py-4 rounded-xl items-center mb-4"
        >
          <Text className="text-white text-lg font-semibold">Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          className="bg-red-600 py-4 rounded-xl items-center"
        >
          <Text className="text-white text-lg font-semibold">
            Delete Product
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductDetails;
