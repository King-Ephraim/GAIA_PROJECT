import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import PageTitle from "@/components/PageTitle";

const StatsScreen = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null);

  const stats = [
    { icon: "exclamation-triangle", color: "#E74C3C", label: "Signalements aujourd’hui", value: "24" },
    { icon: "route", color: "#379F67", label: "Distance parcourue", value: "18,2 km" },
    { icon: "clock", color: "#3498DB", label: "Temps total passé", value: "1h 10 min" },
    { icon: "hourglass-half", color: "#F39C12", label: "Temps estimé restant", value: "1h" },
  ];

  const feedbackOptions = [
    { icon: "frown", label: "Faible", color: "#E74C3C" },
    { icon: "meh", label: "Moyen", color: "#F1C40F" },
    { icon: "smile", label: "Satisfaisant", color: "#27AE60" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Marge avant le titre */}
      <View style={{ marginTop: 30 }}>
        <PageTitle title="Statistiques de la tournée" />
      </View>

      {stats.map((item, idx) => (
        <View key={idx} style={styles.card}>
          <View style={styles.cardRow}>
            <Icon name={item.icon} size={20} color={item.color} />
            <View style={styles.cardContent}>
              <Text style={styles.cardValue}>{item.value}</Text>
              <Text style={styles.cardLabel}>{item.label}</Text>
            </View>
          </View>
        </View>
      ))}

      <Text style={styles.feedbackTitle}>Votre appréciation</Text>
      <View style={styles.feedbackRow}>
        {feedbackOptions.map((option, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.feedbackButton,
              selectedFeedback === i && { backgroundColor: option.color },
            ]}
            onPress={() => setSelectedFeedback(i)}
          >
            <Icon name={option.icon} size={24} color={selectedFeedback === i ? "#fff" : "#333"} />
            <Text style={[
              styles.feedbackLabel,
              selectedFeedback === i && { color: "#fff" },
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.reportButton}>
        <Text style={styles.reportText}>Générer un rapport journalier</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    marginLeft: 12,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  cardLabel: {
    fontSize: 14,
    color: "#666",
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  feedbackRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  feedbackButton: {
    backgroundColor: "#eee",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    width: 90,
  },
  feedbackLabel: {
    marginTop: 4,
    fontSize: 14,
  },
  reportButton: {
    backgroundColor: "#379F67",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  reportText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StatsScreen;