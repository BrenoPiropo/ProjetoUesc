import React from 'react'; 
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Definindo o tipo de navegação
interface Props {
  navigation: any; 
}

const UserInfo: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Adicionado ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Botão User */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Usuario</Text>
        </TouchableOpacity>

        <Image
          source={require('../../assets/DPT.jpg')}
          style={styles.image}
        />

        {/* Ícones e suas respectivas frases */}
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('MeusLaudos')} // Navegar para Meus Laudos
          >
            <Ionicons name="document-text" size={80} color="#FFFFFF" />
            <Text style={styles.iconText}>Meus Laudos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('LaudosEmAndamento')} // Navegar para a nova tela
          >
            <Ionicons name="hourglass" size={80} color="#FFFFFF" />
            <Text style={styles.iconText}>Laudos em Andamento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('LaudosConcluidos')} // Navegar para Laudos Concluídos
          >
            <Ionicons name="checkmark-done" size={80} color="#FFFFFF" />
            <Text style={styles.iconText}>Laudos Concluídos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Categories')} // Navegar para a tela Categories
          >
            <Ionicons name="list" size={80} color="#FFFFFF" />
            <Text style={styles.iconText}>Categorias</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.iconButtonLogout}
          onPress={() => navigation.navigate('Login')} // Navegar para a tela Login
        >
          <Ionicons name="log-out" size={80} color="#FFFFFF" />
          <Text style={styles.iconText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03045E',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 90, // Torna a imagem arredondada
  },
  button: {
    width: 350,
    height: 47,
    backgroundColor: '#D9DCD6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    marginBottom: 20,
  },
  iconButtonLogout: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40, // Ajustado para espaçamento
  },
  iconText: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UserInfo;
