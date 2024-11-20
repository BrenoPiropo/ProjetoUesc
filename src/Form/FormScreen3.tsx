import React from 'react';
import { ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import { styles } from '../styles/FormStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ObservacoesInputs {
  placas?: string;
  vidros?: string;
  etiquetas?: string;
  plaquetaFabricacao?: string;
  chassiVin?: string;
  motor?: string;
  dadosCentralEletronica?: string;
}

interface Props {
  onSubmit: (data: ObservacoesInputs) => void;
  navigation: StackNavigationProp<any>;
}

const Formulario3: React.FC<Props> = ({ onSubmit, navigation }) => {
  const handleNext = async (values: ObservacoesInputs) => {
    try {
      await AsyncStorage.setItem('observacoesData', JSON.stringify(values));
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }

    navigation.navigate('Series Auxiliares'); // Nome correto da tela
  };

  return (
    <Formik
      initialValues={{
        placas: '',
        vidros: '',
        etiquetas: '',
        plaquetaFabricacao: '',
        chassiVin: '',
        motor: '',
        dadosCentralEletronica: '',
      }}
      onSubmit={(values) => {
        if (onSubmit) {
          onSubmit(values);
        }
        handleNext(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.exameTitle}>Observações</Text>
          <TextInput
            style={styles.input}
            placeholder="Das placas"
            onChangeText={handleChange('placas')}
            onBlur={handleBlur('placas')}
            value={values.placas}
          />
          <TextInput
            style={styles.input}
            placeholder="Dos vidros"
            onChangeText={handleChange('vidros')}
            onBlur={handleBlur('vidros')}
            value={values.vidros}
          />
          <TextInput
            style={styles.input}
            placeholder="Das etiquetas"
            onChangeText={handleChange('etiquetas')}
            onBlur={handleBlur('etiquetas')}
            value={values.etiquetas}
          />
          <TextInput
            style={styles.input}
            placeholder="Da plaqueta de fabricação"
            onChangeText={handleChange('plaquetaFabricacao')}
            onBlur={handleBlur('plaquetaFabricacao')}
            value={values.plaquetaFabricacao}
          />
          <TextInput
            style={styles.input}
            placeholder="Do chassi/VIN"
            onChangeText={handleChange('chassiVin')}
            onBlur={handleBlur('chassiVin')}
            value={values.chassiVin}
          />
          <TextInput
            style={styles.input}
            placeholder="Do motor"
            onChangeText={handleChange('motor')}
            onBlur={handleBlur('motor')}
            value={values.motor}
          />
          <TextInput
            style={styles.input}
            placeholder="Dos dados da central eletrônica"
            onChangeText={handleChange('dadosCentralEletronica')}
            onBlur={handleBlur('dadosCentralEletronica')}
            value={values.dadosCentralEletronica}
          />
          <TouchableOpacity
            style={[styles.button, {
              backgroundColor: values.placas && values.vidros && values.etiquetas && values.plaquetaFabricacao && values.chassiVin && values.motor && values.dadosCentralEletronica ? 'blue' : 'gray'
            }]}
            onPress={() => handleSubmit()} 
            disabled={!values.placas || !values.vidros || !values.etiquetas || !values.plaquetaFabricacao || !values.chassiVin || !values.motor || !values.dadosCentralEletronica}
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Formulario3;
