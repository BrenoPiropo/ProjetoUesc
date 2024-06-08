import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import {styles} from '../styles/FormStyles'
import { StackNavigationProp } from '@react-navigation/stack';

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
  const handleNext = () => {
    navigation.navigate('Series Auxiliares');
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
        onSubmit(values);
        handleNext(); // Navigate to next screen after submission
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
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
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={handleNext} // Navigate to next screen
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Formulario3;
