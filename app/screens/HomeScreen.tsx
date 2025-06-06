import { StyleSheet, Text, ScrollView, View, Image } from 'react-native'
import React from 'react'
import PageTitle from '@/components/PageTitle'
import OptionButton from '@/components/OptionButton'

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <PageTitle title='Acceuil' />
      </View>
      <View style={styles.topInformations}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
        </View>
        <View style={styles.userInformations}>
          <Text style={styles.userName}>Bernard TOFA</Text>
          <Text style={styles.status}>connecté</Text>
        </View>
        <View style={styles.initialsContainer}>
          <Text  style={styles.initialsText}>BT</Text>
        </View>
      </View>

      <View style={styles.graphContainer}>
        <View>

        </View>
        <View style={styles.numberHistoriqueContainer}>
          <Text style={styles.numberHistorique}>05</Text>
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
  )
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      backgroundColor:"#E1E1E1",
  },
  topInformations: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 25,
    
  },
  logoContainer: {
   flex:1,
   alignItems:"flex-start",
  },
  logo:{
    width:130,
    height:130,
  },
  userInformations: {
    alignItems: 'flex-end',
    marginRight:20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"#379F67"
  },
  initialsContainer: {
    width: 55,
    height: 55,
    borderRadius: 5,
    backgroundColor: '#379F67',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText:{
    fontSize:18,
    color:"#fff",
    fontWeight:"bold"
  },
  navigatorContainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    paddingVertical: 5,
    paddingHorizontal: 25, 
    marginVertical:10,
    gap:35,
  },
  graphContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#9DC0AB",
    marginTop:-10,
    width:"84%",
    height:100,
    borderRadius:10
  },
  numberHistoriqueContainer: {
    width: 55,
    height: 55,
    borderRadius: 5,
    backgroundColor: '#379F67',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberHistorique: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },



  
})