import PageTitle from "@/components/PageTitle";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome5";

type MarkerData = {
  id: number;
  latitude: number;
  longitude: number;
  image: any;
  address: string;
  type: "urgent" | "non-collecté";
};

type MapScreenProps = {
  onVoirPlus?: () => void;
  setSelectedMarker?: (marker: MarkerData) => void;
};

const MapScreen: React.FC<MapScreenProps> = ({ onVoirPlus, setSelectedMarker }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [localSelected, setLocalSelected] = useState<MarkerData | null>(null);

  const markers: MarkerData[] = [
    {
      id: 1,
      latitude: 6.1642,
      longitude: 1.2314,
      image: require("../../assets/images/poubelle1.jpg"),
      address: "Adidogomé, Rue Palace",
      type: "urgent",
    },
    {
      id: 2,
      latitude: 6.165,
      longitude: 1.232,
      image: require("../../assets/images/poubelle2.jpg"),
      address: "Tokoin, Marché central",
      type: "non-collecté",
    },
  ];

  const filteredMarkers = markers.filter(
    (marker) => filter === "all" || marker.type === filter
  );

  const handleVoirPlus = () => {
    if (localSelected) {
      setSelectedMarker?.(localSelected);
      onVoirPlus?.();
    }
  };

  const handleMapPress = () => {
    setLocalSelected(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.1642,
          longitude: 1.2314,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        {filteredMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            onPress={() => setLocalSelected(marker)}
          />
        ))}
      </MapView>

      <View style={styles.header} pointerEvents="box-none">
        <PageTitle title=" Carte de signalements" />
        <View style={styles.searchContainer}>
          <Icon name="search" size={16} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une zone..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filterButton, filter === "urgent" && styles.filterUrgent]}
            onPress={() => setFilter("urgent")}
          >
            <Text style={styles.filterText}>Urgent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === "non-collecté" && styles.filterNonCollecte]}
            onPress={() => setFilter("non-collecté")}
          >
            <Text style={styles.filterText}>Non collectés</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === "all" && styles.filterAll]}
            onPress={() => setFilter("all")}
          >
            <Text style={styles.filterText}>Tous</Text>
          </TouchableOpacity>
        </View>
      </View>

      {localSelected && (
        <View style={styles.fiche}>
          <Image source={localSelected.image} style={styles.ficheImage} />
          <Text style={styles.ficheAddress}>{localSelected.address}</Text>
          <TouchableOpacity style={styles.ficheButton} onPress={handleVoirPlus}>
            <Text style={styles.ficheButtonText}>Voir plus</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  header: {
    position: "absolute",
    top: 30,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    elevation: 5,
    zIndex: 10,
    marginTop: 50,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  searchInput: { flex: 1, height: 40, fontSize: 14 },
  filters: { flexDirection: "row", justifyContent: "space-between" },
  filterButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  filterText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  filterUrgent: { backgroundColor: "#E74C3C" },
  filterNonCollecte: { backgroundColor: "#F39C12" },
  filterAll: { backgroundColor: "#3498DB" },

  fiche: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 5,
    alignItems: "center",
    zIndex: 20,
  },
  ficheImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  ficheAddress: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  ficheButton: {
    backgroundColor: "#379F67",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  ficheButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default MapScreen;