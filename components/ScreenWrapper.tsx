import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
};

const ScreenWrapper = ({ children }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default ScreenWrapper;