import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import axios from "axios";

// 👇 Ajout de onGoToRegister dans les props
const LoginScreen = ({
  onLoginSuccess,
  onGoToRegister,
}: {
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
}) => {
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        nomUtilisateur,
        motDePasse,
      });

      const { token } = response.data;
      console.log("Token:", token);
      // TODO: Sauvegarder le token avec SecureStore ou AsyncStorage
      onLoginSuccess();
    } catch (error: any) {
      Alert.alert("Erreur", error.response?.data?.error || "Connexion échouée");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={nomUtilisateur}
        onChangeText={setNomUtilisateur}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={motDePasse}
        onChangeText={setMotDePasse}
      />
      <Button title="Se connecter" onPress={handleLogin} />
      
      {/* 👇 Lien pour aller à l'inscription */}
      <TouchableOpacity onPress={onGoToRegister} style={styles.registerLink}>
        <Text style={{ color: "#007bff", textAlign: "center", marginTop: 15 }}>
          Pas encore de compte ? Créez-en un
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center"
  },
  registerLink: {
    marginTop: 10
  }
});

export default LoginScreen;
