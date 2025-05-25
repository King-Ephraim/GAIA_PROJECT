import React, { useState } from "react";
import { View } from "react-native";
import CustomNavBar from "../components/CustomNavBar";

import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ReportScreen from "./screens/ReportScreen";
import ProfileScreen from "./screens/ProfileScreen";

const index = () => {
  const [active, setActive] = useState("home");

  const renderContent = () => {
    switch (active) {
      case "home":
        return <HomeScreen />;
      case "report":
        return <ReportScreen />;
      case "map":
        return <MapScreen />;
      case "history":
        return <HistoryScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
        {renderContent()}  
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
    </View>
  );
};

export default index;
