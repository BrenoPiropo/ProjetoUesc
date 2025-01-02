import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import { styles } from '../styles/FormStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [allValues, setAllValues] = useState<FormInputs[]>([]); // Armazena todos os valores submetidos

  const handleNext = async (values: FormInputs) => {
    try {
      // Salva os dados localmente no AsyncStorage
      await AsyncStorage.setItem('formulario2Data', JSON.stringify(values));

      // Atualiza o estado com os novos valores
      setAllValues((prevValues) => [...prevValues, values]);

      // Exibe todos os valores acumulados no console
      console.log("Todos os valores submetidos até agora:", [...allValues, values]);
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }

    // Navega para a próxima tela
    navigation.navigate('Observações');
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
        if (onSubmit) {
          onSubmit(values);
        }
        handleNext(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.exameTitle}>Exame</Text>
          <TextInput
            style={styles.input}
            placeholder="Placa Portada"
            onChangeText={(text) => handleChange('placaPortada')(text)}
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
            onChangeText={(text) => handleChange('numeroChassi')(text)}
            onBlur={handleBlur('numeroChassi')}
            value={values.numeroChassi !== undefined ? String(values.numeroChassi) : ''}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Numeração do Motor"
            onChangeText={(text) => handleChange('numeracaoMotor')(text)}
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
            style={[
              styles.button,
              {
                backgroundColor:
                  values.placaPortada !== undefined &&
                  values.marcaModelo &&
                  values.especieTipo &&
                  values.cor &&
                  values.vidros &&
                  values.numeroChassi !== undefined &&
                  values.numeracaoMotor !== undefined
                    ? 'blue'
                    : 'gray',
              },
            ]}
            onPress={() => handleSubmit()}
            disabled={
              values.placaPortada === undefined ||
              !values.marcaModelo ||
              !values.especieTipo ||
              !values.cor ||
              !values.vidros ||
              values.numeroChassi === undefined ||
              values.numeracaoMotor === undefined
            }
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Formulario2;
