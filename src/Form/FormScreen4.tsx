import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import { styles } from '../styles/FormStyles';
import { StackNavigationProp } from '@react-navigation/stack';

interface Formulario4Inputs {
  seriesAuxiliares?: string;
  placa?: number;
  vin?: number;
  marcaModelo?: string;
  categoria?: string;
  cor?: string;
  anoFabricacao?: string;
  serieMotor?: string;
  licenciadoNome?: string;
}

interface Props {
  onSubmit: (data: Formulario4Inputs) => void;
  navigation: StackNavigationProp<any>;
}

const Formulario4: React.FC<Props> = ({ onSubmit, navigation }) => {
  const handleNext = () => {
    navigation.navigate('FormularioParte5');
  };

  return (
    <Formik
      initialValues={{
        seriesAuxiliares: '',
        placa: undefined,
        vin: undefined,
        marcaModelo: '',
        categoria: '',
        cor: '',
        anoFabricacao: '',
        serieMotor: '',
        licenciadoNome: '',
      }}
      onSubmit={(values) => {
        onSubmit(values);
        handleNext();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <Text style={styles.exameTitle}>Formulário 4</Text>
          <TextInput
            style={styles.input}
            placeholder="Das séries auxiliares"
            onChangeText={handleChange('seriesAuxiliares')}
            onBlur={handleBlur('seriesAuxiliares')}
            value={values.seriesAuxiliares}
          />
          <TextInput
            style={styles.input}
            placeholder="Placa"
            onChangeText={(text) => {
              const parsed = parseInt(text);
              handleChange('placa');
            }}
            onBlur={handleBlur('placa')}
            value={values.placa ? String(values.placa) : ''}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="VIN"
            onChangeText={(text) => {
              const parsed = parseInt(text);
              handleChange('vin');
            }}
            onBlur={handleBlur('vin')}
            value={values.vin ? String(values.vin) : ''}
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
            placeholder="Categoria"
            onChangeText={handleChange('categoria')}
            onBlur={handleBlur('categoria')}
            value={values.categoria}
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
            placeholder="Ano de Fabricação (DD/MM/AAAA)"
            onChangeText={handleChange('anoFabricacao')}
            onBlur={handleBlur('anoFabricacao')}
            value={values.anoFabricacao}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Série do Motor"
            onChangeText={handleChange('serieMotor')}
            onBlur={handleBlur('serieMotor')}
            value={values.serieMotor}
          />
          <TextInput
            style={styles.input}
            placeholder="Licenciado em nome de"
            onChangeText={handleChange('licenciadoNome')}
            onBlur={handleBlur('licenciadoNome')}
            value={values.licenciadoNome}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Formulario4;
