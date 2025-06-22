import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, UrlTile } from 'react-native-maps';
import PageTitle from '@/components/PageTitle';

const { width } = Dimensions.get('window');

const sampleReports = [
  {
    id: '1',
    title: 'Dépôt sauvage',
    status: 'En cours',
    date: '19 avril 2024',
    coordinate: { latitude: 6.1319, longitude: 1.2228 },
  },
  {
    id: '2',
    title: 'Poubelle débordante',
    status: 'Résolu',
    date: '10 mars 2024',
    coordinate: { latitude: 6.137, longitude: 1.215 },
  },
  {
    id: '3',
    title: 'Ordures abandonnées',
    status: 'En cours',
    date: '03 avril 2024',
    coordinate: { latitude: 6.128, longitude: 1.230 },
  },
];

const filters = ['Tous', 'En cours', 'Résolu'];

export default function MapScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Tous');

  const filteredReports =
    selectedFilter === 'Tous'
      ? sampleReports
      : sampleReports.filter((r) => r.status === selectedFilter);

  return (
    <View style={styles.screen}>
      <View style={styles.fixedHeader}>
        <PageTitle title="Carte" />
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.1319,
          longitude: 1.2228,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

        {filteredReports.map((report) => (
          <Marker key={report.id} coordinate={report.coordinate}>
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{report.title}</Text>
                <Text style={styles.calloutStatus}>{report.status}</Text>
                <Text style={styles.calloutDate}>{report.date}</Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>Voir détails</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E1E1E1',
  },
  fixedHeader: {
    backgroundColor: '#E1E1E1',
    zIndex: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#379F67',
  },
  filterButton: {
    backgroundColor: '#69A88D',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterButtonActive: {
    backgroundColor: '#fff',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#379F67',
  },
  map: {
    flex: 1,
  },
  calloutContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: width * 0.6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1E2B1F',
    marginBottom: 4,
  },
  calloutStatus: {
    fontSize: 14,
    color: '#379F67',
    marginBottom: 2,
  },
  calloutDate: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  detailsButton: {
    backgroundColor: '#379F67',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
