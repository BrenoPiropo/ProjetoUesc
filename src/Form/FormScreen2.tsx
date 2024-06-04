import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import {styles} from '../styles/FormStyles';
import { StackNavigationProp } from '@react-navigation/stack';

interface FormInputs {
  placaPortada?: number;
  marcaModelo?: string;
  especieTipo?: string;
  cor?: string;
  vidros?: string;
  numeroChassi?: number;
  numeracaoMotor?: number;
  outrasNumeracoes?: string;
}

interface Props {
  onSubmit: (data: FormInputs) => void;
  navigation: StackNavigationProp<any>;
}

const Formulario2: React.FC<Props> = ({ onSubmit, navigation }) => {
  const handleNext = () => {
    navigation.navigate('FormularioParte3');
  };

  return (
    <Formik
      initialValues={{
        placaPortada: undefined,
        marcaModelo: '',
        especieTipo: '',
        cor: '',
        vidros: '',
        numeroChassi: undefined,
        numeracaoMotor: undefined,
        outrasNumeracoes: '',
      }}
      onSubmit={(values) => {
        onSubmit(values);
        handleNext();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <Text style={styles.exameTitle}>Exame</Text>
          <TextInput
            style={styles.input}
            placeholder="Placa Portada"
            onChangeText={handleChange('placaPortada')}
            onBlur={handleBlur('placaPortada')}
            value={values.placaPortada !== undefined ? String(values.placaPortada) : ''}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Marca / Modelo"
            onChangeText={handleChange('marcaModelo')}
            onBlur={handleBlur('marcaModelo')}
            value={values.marcaModelo}
          />
          <TextInput
            style={styles.input}
            placeholder="Espécie / Tipo"
            onChangeText={handleChange('especieTipo')}
            onBlur={handleBlur('especieTipo')}
            value={values.especieTipo}
          />
          <TextInput
            style={styles.input}
            placeholder="Cor"
            onChangeText={handleChange('cor')}
            onBlur={handleBlur('cor')}
            value={values.cor}
          />
          <TextInput
            style={styles.input}
            placeholder="Vidros"
            onChangeText={handleChange('vidros')}
            onBlur={handleBlur('vidros')}
            value={values.vidros}
          />
          <TextInput
            style={styles.input}
            placeholder="Número do CHASSI"
            onChangeText={handleChange('numeroChassi')}
            onBlur={handleBlur('numeroChassi')}
            value={values.numeroChassi !== undefined ? String(values.numeroChassi) : ''}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Numeração do Motor"
            onChangeText={handleChange('numeracaoMotor')}
            onBlur={handleBlur('numeracaoMotor')}
            value={values.numeracaoMotor !== undefined ? String(values.numeracaoMotor) : ''}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Outras Numerações"
            onChangeText={handleChange('outrasNumeracoes')}
            onBlur={handleBlur('outrasNumeracoes')}
            value={values.outrasNumeracoes}
          />
          <TouchableOpacity
            style={[styles.button, { 
              backgroundColor: values.placaPortada && values.marcaModelo && values.especieTipo && values.cor && values.vidros && values.numeroChassi !== undefined && values.numeracaoMotor !== undefined ? 'blue' : 'gray' 
            }]}
            onPress={handleNext}
            disabled={!values.placaPortada || !values.marcaModelo || !values.especieTipo || !values.cor || !values.vidros || values.numeroChassi === undefined || values.numeracaoMotor === undefined}
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Formulario2;
