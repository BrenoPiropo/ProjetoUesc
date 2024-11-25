import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

const Categories: React.FC<Props> = ({ navigation }) => {
  const navigateToHome = () => {
    navigation.navigate('Drawer', { screen: 'Home' }); 
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('C:/Users/Breno Piropo/projeto/ProjetoUesc/assets/dpt.png')}
        style={styles.image}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Categories</Text>
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton} onPress={navigateToHome}>
            <Ionicons name="car-sport" size={120} color="#FFFFFF" />
            <Text style={styles.iconText}>Carro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="bicycle" size={120} color="#FFFFFF" />
            <Text style={styles.iconText}>Moto</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ellipsis-horizontal-circle" size={120} color="#FFFFFF" />
            <Text style={styles.iconText}>Outros</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('UserInfo')}
          >
            <Ionicons name="person-circle" size={120} color="#FFFFFF" />
            <Text style={styles.iconText}>Usuário</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C6BC0',
    alignItems: 'center',
    paddingTop: 50,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  button: {
    width: 352,
    height: 47,
    backgroundColor: '#6D5B40',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  iconText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Categories;
