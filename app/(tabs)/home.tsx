import React, { useState } from "react";
import { View, Text } from "react-native";
import CustomNavBar from "../../components/CustomNavBar";

const home = () => {
  const [active, setActive] = useState("home");

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Text style={{ textAlign: "center", marginTop: 60 }}>Contenu de la page {active}</Text>

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
            key: "map",
            iconLib: "Entypo",
            iconName: "map-marked-alt",
            onPress: () => setActive("map"),
          },
          {
            key: "trash",
            iconLib: "FontAwesome5",
            iconName: "bus",
            onPress: () => setActive("trash"),
          },
          {
            key: "stats",
            iconLib: "Ionicons",
            iconName: "bar-chart-outline",
            onPress: () => setActive("stats"),
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

export default home;
