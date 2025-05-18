import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons ,Entypo} from "@expo/vector-icons";

type Props = {
  iconLib: "Ionicons" | "FontAwesome5" | "MaterialCommunityIcons" | "Entypo";
  iconName: string;
  color?: string;
  size?: number;
};

const FocusedPinIcon: React.FC<Props> = ({ iconLib, iconName, color = "#00C358", size = 24 }) => {
  const renderIcon = () => {
    switch (iconLib) {
      case "Ionicons":
        return <Ionicons name={iconName as any} size={size} color={color} />;
      case "FontAwesome5":
        return <FontAwesome5 name={iconName as any} size={size} color={color} />;
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
      case "Entypo":
        return <Entypo name={iconName as any} size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
        <View style={styles.pinWrapper}>
            <View style={styles.pinContainer}>
                <View style={styles.pinCircle}>{renderIcon()}</View>
            </View>
            <View style={styles.pinTriangle} />
        </View>
      );
};

const styles = StyleSheet.create({
    pinWrapper: {
      alignItems: "center",
      transform: [{ translateY: -30 }],
    },
    pinContainer: {
      backgroundColor: "#fff",
      borderRadius: 120,
      borderWidth: 2,
      borderColor: "#379F67",
      padding: 0,
    },
    pinCircle: {
      width: 50,
      height: 50,
      borderRadius: 120,
      justifyContent: "center",
      alignItems: "center",
    },
    pinTriangle: {
      width: 0,
      height: 0,
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderTopWidth: 12,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: "#379F67",
      marginTop: -2, 
    },
  });
  
  
export default FocusedPinIcon;
