import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
interface SplashScreenProps {
    onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../../assets/images/logo_blanc.png')} style={styles.logo} />
            </View>
            <View style={styles.welcomeContainer}> 
                <Text style={styles.welcomeText}>
                    Bienvenue, sur votre{'\n'}
                    plateforme de gestion{'\n'}
                    de déchets
                </Text>

            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={onStart}>
                    <Text style={styles.buttonText}>Démarrer la navigation</Text>
                    <AntDesign name="rightcircle" size={30} color="#379F67" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#379F67',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginTop: 30,
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'left',
    lineHeight: 32,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#379F67',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
