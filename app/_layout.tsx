import React from "react";
import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

const Layout = () => {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8", // ou ta couleur globale
  },
});

export default Layout;