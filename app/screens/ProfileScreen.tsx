import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Feather, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import PageTitle from '@/components/PageTitle';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <PageTitle title="Profil" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Avatar et Infos */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>BT</Text>
          </View>
          <Text style={styles.name}>Bernard TOFA</Text>
          <View style={styles.roleTag}>
            <Text style={styles.roleText}>Citoyen</Text>
          </View>
          <Text style={styles.email}>bernard.tofa@email.com</Text>
        </View>

        {/* Statistiques */}
        <View style={styles.statsBox}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Nombre de signalements</Text>
            <Text style={styles.statValue}>10</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Résolus</Text>
            <Text style={styles.statValue}>6</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>En attente</Text>
            <Text style={styles.statValue}>4</Text>
          </View>
        </View>

        {/* Options */}
        <TouchableOpacity style={styles.option}>
          <Feather name="edit" size={24} color="#379F67" />
          <Text style={styles.optionText}>Modifier mes informations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Entypo name="key" size={24} color="#379F67" />
          <Text style={styles.optionText}>Changer le mot de passe</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="notifications-outline" size={24} color="#379F67" />
          <Text style={styles.optionText}>Activer/Désactiver les notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="power-settings-new" size={24} color="#379F67" />
          <Text style={styles.optionText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E1E1E1',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    marginTop:30,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#379F67',
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  roleTag: {
    backgroundColor: '#DFF6E1',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 5,
  },
  roleText: {
    color: '#379F67',
    fontWeight: 'bold',
  },
  email: {
    marginTop: 4,
    fontSize: 14,
    color: '#333',
  },
  statsBox: {
    width: '100%',
    backgroundColor: '#DFF6E1',
    borderRadius: 15,
    padding: 16,
    marginVertical: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  statValue: {
    fontSize: 18,
  },
  option: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
});
