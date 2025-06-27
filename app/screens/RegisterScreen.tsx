import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import axios from "axios";

const RegisterScreen = ({
    onRegisterSuccess,
    onGoToLogin,
}: {
    onRegisterSuccess: () => void;
    onGoToLogin: () => void;
}) => {
    const [nomUtilisateur, setNomUtilisateur] = useState("");
    const [courriel, setCourriel] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/register", {
                nomUtilisateur,
                courriel,
                motDePasse,
                prenom,
                nom,
            });

            console.log("Inscription réussie:", response.data);
            Alert.alert("Succès", "Inscription réussie !");
            onRegisterSuccess();
        } catch (error: any) {
            Alert.alert("Erreur", error.response?.data?.error || "Échec de l'inscription");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer un compte</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur"
                value={nomUtilisateur}
                onChangeText={setNomUtilisateur}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={courriel}
                onChangeText={setCourriel}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={motDePasse}
                onChangeText={setMotDePasse}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={prenom}
                onChangeText={setPrenom}
            />
            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={nom}
                onChangeText={setNom}
            />

            <Button title="S'inscrire" onPress={handleRegister} />

            {/* 👇 Lien pour revenir à la page de connexion */}
            <TouchableOpacity onPress={onGoToLogin} style={styles.loginLink}>
                <Text style={{ color: "#007bff", textAlign: "center", marginTop: 15 }}>
                    Vous avez déjà un compte ? Connectez-vous
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    loginLink: {
        marginTop: 10
    },
});

export default RegisterScreen;
