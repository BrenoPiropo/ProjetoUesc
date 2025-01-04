import React from 'react';
import { ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { styles } from '../styles/FormStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ConclusaoInputs {
  condicoesTecnicas?: string;
  conclusao?: string;
}

interface Props {
  onSubmit: (data: ConclusaoInputs) => void;
  navigation: StackNavigationProp<any>;
}

const Formulario5: React.FC<Props> = ({ onSubmit, navigation }) => {
  const handleNext = async (values: ConclusaoInputs) => {
    try {
      // Salva os dados do formulário no AsyncStorage
      await AsyncStorage.setItem('formulario5Data', JSON.stringify(values));
      console.log('formulario5Data salvo com sucesso:', values);

      // Navegar para a próxima tela
      navigation.navigate('Fotos do veiculo'); // Nome correto da próxima tela
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        condicoesTecnicas: '',
        conclusao: '',
      }}
      onSubmit={(values) => {
        if (onSubmit) {
          onSubmit(values);
        }
        handleNext(values);

        // Adicionando um console.log aqui para verificar os dados
        console.log("Dados enviados para o handleNext:", values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView
          contentContainerStyle={styles.container}
          style={{ flex: 1 }}
        >
          <Text style={styles.exameTitle}>Conclusão</Text>
          <TextInput
            style={[styles.input, { height: 150 }]}
            placeholder="Das condições técnicas do veículo"
            onChangeText={handleChange('condicoesTecnicas')}
            onBlur={handleBlur('condicoesTecnicas')}
            value={values.condicoesTecnicas}
          />
          <TextInput
            style={[styles.input, { height: 150 }]}
            placeholder="Conclusão"
            onChangeText={handleChange('conclusao')}
            onBlur={handleBlur('conclusao')}
            value={values.conclusao}
          />
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: values.condicoesTecnicas && values.conclusao ? 'green' : 'gray',
              },
            ]}
            onPress={() => handleSubmit()}
            disabled={!values.condicoesTecnicas || !values.conclusao}
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Formulario5;
