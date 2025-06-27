import { StyleSheet, Text, ScrollView, View, Image, Dimensions } from 'react-native'
import React from 'react'
import PageTitle from '@/components/PageTitle'
import OptionButton from '@/components/OptionButton'

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <View style={styles.screen}>
      {/* Titre fixé en haut */}
      <View style={styles.fixedHeader}>
        <PageTitle title="Accueil" />
      </View>

      {/* Contenu scrollable */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topInformations}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/logo.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.userInformations}>
            <Text style={styles.userName}>Bernard TOFA</Text>
            <Text style={styles.status}>connecté</Text>
          </View>
          <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>BT</Text>
          </View>
        </View>

        <View>
          <View style={styles.navigatorContainer}>
            <OptionButton
              iconLib="FontAwesome5"
              iconName="trash-alt"
              buttonTitle="Signaler dépôt"
              onPress={() => onNavigate("report")}
            />
            <OptionButton
              iconLib="FontAwesome5"
              iconName="map-marked-alt"
              buttonTitle="Carte"
              onPress={() => onNavigate("map")}
            />
          </View>
          <View style={styles.navigatorContainer}>
            <OptionButton
              iconLib="Ionicons"
              iconName="time-outline"
              buttonTitle="Historique"
              onPress={() => onNavigate("history")}
            />
            <OptionButton
              iconLib="Ionicons"
              iconName="person-outline"
              buttonTitle="Profil"
              onPress={() => onNavigate("profile")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#E1E1E1",
  },
  fixedHeader: {
    width: '100%',
    backgroundColor: '#E1E1E1',
    zIndex: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  topInformations: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
  },
  userInformations: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#379F67",
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#379F67',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  navigatorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  graphContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#9DC0AB",
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    paddingHorizontal: 20,
  },
  numberHistoriqueContainer: {
    width: 55,
    height: 55,
    borderRadius: 8,
    backgroundColor: '#379F67',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberHistorique: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
