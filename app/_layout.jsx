import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../globals.css";

function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerTitle: "Home" }}
      />
      <Stack.Screen
        name="(store)"
        options={{
          headerTitle: "Store",
        }}
      />
      <Stack.Screen
        name="productDetails"
        options={{
          headerTitle: "Edit or Delete product",
        }}
      />
    </Stack>
  );
}

export default function Layout() {
  return (
    <SQLiteProvider
      databaseName="test.db"
      onInit={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            imageUri TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
          );
  `);
        console.log("Initialized database successfully");
      }}
    >
      <SafeAreaView className="flex-1">
        <RootLayout />
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      </SafeAreaView>
    </SQLiteProvider>
  );
}
