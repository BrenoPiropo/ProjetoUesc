import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import { styles } from '../styles/FormStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [allValues, setAllValues] = useState<Formulario4Inputs[]>([]); // Estado para armazenar todos os dados

  const handleNext = async (values: Formulario4Inputs) => {
    try {
      // Salva os dados no AsyncStorage
      await AsyncStorage.setItem('formulario4Data', JSON.stringify(values));

      // Atualiza o estado com os novos valores
      setAllValues((prevValues) => [...prevValues, values]);

      // Exibe no console todos os valores submetidos até agora
      console.log("Todos os valores submetidos até agora:", [...allValues, values]);
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }

    // Navega para a próxima tela
    navigation.navigate('Conclusão'); // Nome correto da próxima tela
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
        if (onSubmit) {
          onSubmit(values);
        }
        handleNext(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView contentContainerStyle={styles.container}>
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
              const parsed = parseInt(text, 10);
              handleChange('placa')(isNaN(parsed) ? '' : parsed.toString());
            }}
            onBlur={handleBlur('placa')}
            value={values.placa !== undefined ? String(values.placa) : ''}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="VIN"
            onChangeText={(text) => {
              const parsed = parseInt(text, 10);
              handleChange('vin')(isNaN(parsed) ? '' : parsed.toString());
            }}
            onBlur={handleBlur('vin')}
            value={values.vin !== undefined ? String(values.vin) : ''}
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
            style={[
              styles.button,
              {
                backgroundColor:
                  values.seriesAuxiliares &&
                  values.placa !== undefined &&
                  values.vin !== undefined &&
                  values.marcaModelo &&
                  values.categoria &&
                  values.cor &&
                  values.anoFabricacao &&
                  values.serieMotor &&
                  values.licenciadoNome
                    ? 'blue'
                    : 'gray',
              },
            ]}
            onPress={() => handleSubmit()}
            disabled={
              !values.seriesAuxiliares ||
              values.placa === undefined ||
              values.vin === undefined ||
              !values.marcaModelo ||
              !values.categoria ||
              !values.cor ||
              !values.anoFabricacao ||
              !values.serieMotor ||
              !values.licenciadoNome
            }
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Formulario4;
