import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import PageTitle from '@/components/PageTitle'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import * as ImagePicker from 'expo-image-picker'

export default function ReportScreen({ onImageSelected }: { onImageSelected: (uri: string) => void }) {

  const [image, setImage] = useState<string | null>(null)

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert("Permission refusée", "Vous devez autoriser l'accès à votre galerie.")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri
      setImage(uri)
      onImageSelected(uri)
    }
  }

  return (
    <View style={styles.screen}>
      {/* Titre fixé en haut */}
      <View style={styles.fixedHeader}>
        <PageTitle title="Signalement" />
      </View>

      {/* Contenu scrollable */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.choiceContainer}>
          <TouchableOpacity style={styles.choice}>
            <MaterialIcons name="photo-camera" size={70} color="#ffffff" />
            <Text style={styles.choiceText}>Prendre une photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.choice} onPress={pickImage}>
            <MaterialIcons name="photo-library" size={70} color="#ffffff" />
            <Text style={styles.choiceText}>Choisir une image</Text>
          </TouchableOpacity>
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
  choiceContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 120,
    gap: 50,
  },
  choice: {
    backgroundColor: '#9DC0AB',
    height: 190,
    width: 350,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 25,
  },
})
