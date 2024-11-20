import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Definindo o tipo de navegação
interface Props {
  navigation: any; // Altere o tipo conforme seu setup de navegação
}

const UserInfo: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Imagem acima do botão User */}
      <Image
        source={require('C:/Users/Breno Piropo/projeto/ProjetoUesc/assets/dpt.png')} // Ajuste o caminho da imagem conforme necessário
        style={styles.image}
      />
      {/* Botão User */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Usuario</Text>
      </TouchableOpacity>
      {/* Ícones e suas respectivas frases */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="document-text" size={80} color="#FFFFFF" />
          <Text style={styles.iconText}>Meus Laudos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="hourglass" size={80} color="#FFFFFF" />
          <Text style={styles.iconText}>Laudos em Andamento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="checkmark-done" size={80} color="#FFFFFF" />
          <Text style={styles.iconText}>Laudos Concluídos</Text>
        </TouchableOpacity>
        {/* Ícone para voltar para a tela FormCategories */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Categories')} // Navegar para a tela Categories
        >
          <Ionicons name="list" size={80} color="#FFFFFF" />
          <Text style={styles.iconText}>Categorias</Text>
        </TouchableOpacity>
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
    width: 350,
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
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que os ícones "quebrem" para a próxima linha
    justifyContent: 'space-around', // Espaça os ícones igualmente
    width: '80%',
    marginTop: 20,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%', // Define a largura dos botões dos ícones para garantir que caibam duas colunas
    marginBottom: 20, // Adiciona espaçamento inferior
  },
  iconText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center', // Garante que o texto abaixo dos ícones fique centralizado
  },
});

export default UserInfo;
