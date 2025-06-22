import React, { useState, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import CustomNavBar from "../components/CustomNavBar";

import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ReportScreen from "./screens/ReportScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SplashScreen from "./screens/SplashScreen";
import SendScreen from "./screens/SendScreen";
const Index = () => {
  const [active, setActive] = useState("home");
  const [showSplash, setShowSplash] = useState(true);
  const [showMainApp, setShowMainApp] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const handleStart = () => {
    // Lancer l’animation
    setShowSplash(false); // D'abord cacher le Splash pour voir le fond animé
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowMainApp(true); // Afficher la barre nav après animation
    });
  };

  const renderContent = () => {
    if (showSplash) {
      return <SplashScreen onStart={handleStart} />;
    }

    // Le contenu animé
    return (
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {(() => {
          switch (active) {
            case "home":
              return <HomeScreen onNavigate={(screenKey: string) => setActive(screenKey)} />;
            case "report":
              return <ReportScreen
                onImageSelected={(uri: string) => {
                  setImageUri(uri);
                  setActive("envoie");
                }}
              />;
            case "map":
              return <MapScreen />;
            case "history":
              return <HistoryScreen />;
            case "profile":
              return <ProfileScreen />;
            case "envoie":
              return (
                <SendScreen
                  imageUri={imageUri!}
                  onGoBack={() => setActive("report")}
                />
              );


            default:
              return null;
          }
        })()}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {renderContent()}

      {showMainApp && (
        <CustomNavBar
          focusedKey={active}
          tabs={[
            {
              key: "home",
              iconLib: "Entypo",
              iconName: "home",
              onPress: () => setActive("home"),
            },
            {
              key: "report",
              iconLib: "FontAwesome5",
              iconName: "trash-alt",
              onPress: () => setActive("report"),
            },
            {
              key: "map",
              iconLib: "FontAwesome5",
              iconName: "map-marked-alt",
              onPress: () => setActive("map"),
            },
            {
              key: "history",
              iconLib: "Ionicons",
              iconName: "time-outline",
              onPress: () => setActive("history"),
            },
            {
              key: "profile",
              iconLib: "Ionicons",
              iconName: "person-outline",
              onPress: () => setActive("profile"),
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Index;
