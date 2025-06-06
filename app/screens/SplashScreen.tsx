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
        flexDirection: 'column',
        backgroundColor: '#379F67',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical:20 ,
    },
    logo: {
        width: 500,
        height: 500,
        resizeMode: 'contain',
        marginTop: -30,
    },
    welcomeContainer: {
        width: '100%',
        paddingHorizontal: 15, 
    },
    welcomeText: {
        fontSize: 25,
        color: '#fff',
        textAlign: 'left',
        lineHeight: 28,
        fontWeight: '600',
        paddingHorizontal: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 55,
        borderRadius: 10,
        gap: 15,
        width: "100%",
        height: 60,
    },
    buttonText: {
        color: '#379F67',
        fontWeight: 'bold',
        fontSize: 22,
    },

});
