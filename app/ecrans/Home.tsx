import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
import OptionButton from "../../components/OptionButton";
import PageTitle from "../../components/PageTitle";
import ScreenWrapper from "@/components/ScreenWrapper";

type HomeProps = {
  onNavigate: (screenKey: string) => void;
  username: string;
};

const Home: React.FC<HomeProps> = ({ onNavigate, username }) => {
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.map((part) => part[0]?.toUpperCase()).join("").slice(0, 2);
  };

  const handlePress = (key: string) => () => onNavigate(key);

  return (
    <View style={styles.container}>
      {/* Titre de la page */}
        <PageTitle title="  Duneko" />  

      {/* En-tête */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/logo.jpg")}
          style={styles.logo}
        />
        <Text style={styles.username}>{username}</Text>
        <View style={styles.btContainer}>
          <Text style={styles.btText}>{getInitials(username)}</Text>
        </View>
      </View>

      {/* Grille d’options */}
      <ScrollView contentContainerStyle={styles.grid}>
        <OptionButton
          iconLib="Entypo"
          iconName="map"
          buttonTitle="Carte"
          onPress={handlePress("map")}
        />
        <OptionButton
          iconLib="FontAwesome5"
          iconName="truck"
          buttonTitle="Tournée"
          onPress={handlePress("tours")}
        />
        <OptionButton
          iconLib="FontAwesome5"
          iconName="chart-line"
          buttonTitle="Statistiques"
          onPress={handlePress("stats")}
        />
        <OptionButton
          iconLib="Ionicons"
          iconName="person-outline"
          buttonTitle="Profil"
          onPress={handlePress("profile")}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" , paddingTop: 50},

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },

  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  username: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1C3F3E",
  },

  btContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#379F67",
    alignItems: "center",
    justifyContent: "center",
  },

  btText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 20,
    paddingBottom: 20,
  },
});

export default Home;