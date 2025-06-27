import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Location from 'expo-location';
import axios from 'axios';

interface Props {
  imageUri: string;
  onGoBack: () => void;
}

export default function EnvoieScreen({ imageUri, onGoBack }: Props) {
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [commentaire, setCommentaire] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Impossible d\'accéder à la position.');
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
    })();
  }, []);

  const handleSend = async () => {
    if (!imageUri || !location) return;
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);
    formData.append('commentaire', commentaire);
    formData.append('latitude', String(location.latitude));
    formData.append('longitude', String(location.longitude));

    try {
      await axios.post('http://localhost:5000/api/reports', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Succès', 'Signalement envoyé avec succès.');
    } catch (error) {
      Alert.alert('Erreur', 'Echec de l\'envoi.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack}>
          <AntDesign name="leftcircle" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Envoie</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.label}>Emplacement actuel : {location ? `${location.latitude}, ${location.longitude}` : 'Chargement...'}</Text>
        <TextInput placeholder="Ajouter un commentaire..." style={styles.commentBox} multiline value={commentaire} onChangeText={setCommentaire} />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>ENVOYER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E1E1E1' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16 },
  headerText: { color: '#000000', fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  imageContainer: { flex: 1.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DADADA' },
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
  footer: { flex: 2, padding: 20, justifyContent: 'flex-end' },
  label: { fontSize: 18, marginBottom: 5, fontWeight: 'bold' },
  commentBox: { height: 150, backgroundColor: 'white', borderRadius: 10, marginVertical: 12, padding: 10, textAlignVertical: 'top' },
  button: { backgroundColor: '#379F67', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
