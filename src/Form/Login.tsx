import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

const Login = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      // Simula um login bem-sucedido
      navigation.navigate('UserInfo', { username }); // Passa o username para a próxima tela
    } else {
      Alert.alert('Erro', 'Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão com o nome do aplicativo */}
      <TouchableOpacity style={styles.appButton}>
        <Text style={styles.appButtonText}>Nome do Aplicativo</Text>
      </TouchableOpacity>

      {/* Imagem */}
      <Image 
        source={require('C:/Users/Breno Piropo/projeto/ProjetoUesc/assets/dpt.png')}
        style={styles.image}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5C6BC0',
    padding: 20,
  },
  appButton: {
    width: 352,
    height: 47,
    backgroundColor: '#6D5B40',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderRadius: 8,
  },
  appButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200, // Ajuste o tamanho conforme necessário
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain', // Garante que a imagem não será cortada
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;