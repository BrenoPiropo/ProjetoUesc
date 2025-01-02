import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const laudos = [
  { id: '001', status: 'Em andamento', image: 'https://picsum.photos/100?random=1' },
  { id: '002', status: 'Em andamento', image: 'https://picsum.photos/100?random=2' },
  { id: '003', status: 'Em andamento', image: 'https://picsum.photos/100?random=3' },
  { id: '004', status: 'Em andamento', image: 'https://picsum.photos/100?random=4' },
];

const LaudosEmAndamento: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Em andamento</Text>
      </TouchableOpacity>

      <FlatList
        data={laudos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.laudoContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.laudoInfo}>
              <Text style={styles.laudoId}>Laudo ID: {item.id}</Text>
              <Text style={styles.laudoStatus}>Status: {item.status}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03045E',
  },
  button: {
    width: 382,
    height: 47,
    backgroundColor: '#D9DCD6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  laudoContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20, // Aumentei o padding
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: 80, // Aumentei o tamanho da imagem
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  laudoInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  laudoId: {
    fontSize: 18, // Aumentei o tamanho do texto
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  laudoStatus: {
    fontSize: 16,
    color: '#666666',
  },
});

export default LaudosEmAndamento;
