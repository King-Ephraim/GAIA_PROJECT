import { StyleSheet, Text, ScrollView, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import PageTitle from '@/components/PageTitle'

type Report = {
  id: string;
  title: string;
  date: string;
  address: string;
  status: 'Résolu' | 'En cours' | 'Clôturé';
  image: any;
};

const reports: Report[] = [
  {
    id: '1',
    title: 'Dépôt illégal',
    date: '25 Mars 2024',
    address: '123 Rue Forêt',
    status: 'Résolu',
    image: require('../../assets/images/dechet.png'),
  },
  {
    id: '2',
    title: 'Poubelle débordante',
    date: '18 Mars 2024',
    address: '456 Rue du Chêne',
    status: 'En cours',
    image: require('../../assets/images/dechet.png'),
  },
  {
    id: '3',
    title: 'Jet de détritus',
    date: '7 Février 2024',
    address: '789 Rue des Pins',
    status: 'Clôturé',
    image: require('../../assets/images/dechet.png'),
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const backgroundColor =
    status === 'Résolu' ? '#DFF6E1' :
    status === 'En cours' ? '#FCEFD3' : '#E6E6E6';

  const textColor =
    status === 'Résolu' ? '#0F7B42' :
    status === 'En cours' ? '#A86C1C' : '#777';

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.badgeText, { color: textColor }]}>{status}</Text>
    </View>
  );
};

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <PageTitle title="Historique" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.address}>{item.address}</Text>
              </View>
              <StatusBadge status={item.status} />
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1E1E1",
    paddingTop: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  inner: {
    padding: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2B1F',
  },
  date: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  address: {
    fontSize: 13,
    color: '#555',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
