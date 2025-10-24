import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const AddProduct = () => {
  const db = useSQLiteContext();
  const router = useRouter();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const handlePickImage = async () => {
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    const mediaPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraPerm.status !== "granted" || mediaPerm.status !== "granted") {
      alert("Camera and media permissions are required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSaveProduct = async () => {
    if (!name || !quantity || !price) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await db.runAsync(
        `INSERT INTO products (name, quantity, price, imageUri)
         VALUES (?, ?, ?, ?);`,
        [name, parseInt(quantity, 10), parseFloat(price), imageUri]
      );

      alert("✅ Product saved!");
      // Clear inputs
      setName("");
      setQuantity("");
      setPrice("");
      setImageUri(null);

      // Redirect to store after 500ms
      setTimeout(() => {
        router.push("/(store)/store");
      }, 500);
    } catch (err) {
      console.error("Insert error:", err);
      alert("❌ Failed to save product");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Add New Product
      </Text>

      <Text className="text-gray-600 mb-2">Product Name</Text>
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
        placeholder="Enter product name"
        value={name}
        onChangeText={setName}
      />

      <Text className="text-gray-600 mb-2">Quantity</Text>
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
        placeholder="Enter quantity"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />

      <Text className="text-gray-600 mb-2">Price (₦)</Text>
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
        placeholder="Enter price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <Text className="text-gray-600 mb-2">Product Image (optional)</Text>
      <TouchableOpacity
        onPress={handlePickImage}
        className="border border-dashed border-gray-400 rounded-xl h-48 mb-5 items-center justify-center"
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-gray-400">Tap to capture or select image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSaveProduct}
        className="bg-blue-600 py-4 rounded-xl items-center shadow-md"
      >
        <Text className="text-white text-lg font-semibold">Save Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddProduct;
