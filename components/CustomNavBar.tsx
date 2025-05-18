import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons ,Entypo} from "@expo/vector-icons";
import FocusedPinIcon from "./FocusedPinIcon";
type TabItem = {
  key: string;
  iconLib: "Ionicons" | "FontAwesome5" | "MaterialCommunityIcons" | "Entypo"; 
  iconName: string;
  onPress: () => void;
};

type Props = {
  tabs: TabItem[];
  focusedKey: string;
};

const CustomBottomNav: React.FC<Props> = ({ tabs, focusedKey }) => {
  const renderIcon = (lib: string, name: string, color: string, size: number) => {
    switch (lib) {
      case "Ionicons":
        return <Ionicons name={name as any} size={size} color={color} />;
      case "FontAwesome5":
        return <FontAwesome5 name={name as any} size={size} color={color} />;
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
      case "Entypo":
        return <Entypo name={name as any} size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isFocused = tab.key === focusedKey;
        return (
            <TouchableOpacity key={tab.key} onPress={tab.onPress} style={styles.tab}>
            {isFocused ? (
              <FocusedPinIcon
                iconLib={tab.iconLib}
                iconName={tab.iconName}
              />
            ) : (
              <View style={styles.iconWrapper}>
                {renderIcon(tab.iconLib, tab.iconName, "#fff", 24)}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#9DC0AB",
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "visible", 
    position: "relative", 
    zIndex: 1,
  },
  tab: {
    alignItems: "center",
    overflow: "visible", 
    flex: 1,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#A5BDAA",
    justifyContent: "center",
    alignItems: "center",
  },
  focused: {
    backgroundColor: "#fff",
    borderColor: "#00C358",
    borderWidth: 2,
    transform: [{ translateY: -10 }],
  },
});

export default CustomBottomNav;


