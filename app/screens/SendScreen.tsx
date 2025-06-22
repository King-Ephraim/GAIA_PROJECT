import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

interface Props {
  imageUri: string;
  onGoBack: () => void;
}

export default function EnvoieScreen({ imageUri, onGoBack }: Props) {
  return (
    <View style={styles.container}>
      {/* Header avec flèche retour */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack}>
          <AntDesign name="leftcircle" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Envoie</Text>
      </View>

      {/* Affichage image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>

      {/* Pied de page avec commentaire + bouton */}
      <View style={styles.footer}>
        <Text style={styles.label}>Emplacement actuel : Lomé, Sanguera Vogomé</Text>
        <TextInput
          placeholder="Ajouter un commentaire..."
          style={styles.commentBox}
          multiline
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ENVOYER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E1E1E1' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  headerText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },

  imageContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DADADA',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  footer: {
    flex: 2,
    padding: 20,
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  commentBox: {
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 12,
    padding: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#379F67',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
