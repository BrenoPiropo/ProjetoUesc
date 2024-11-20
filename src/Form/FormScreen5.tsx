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
      await AsyncStorage.setItem('formulario5Data', JSON.stringify(values));
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }

    // Navegar para a próxima tela
    navigation.navigate('Fotos do veiculo');
  };

  return (
    <Formik
      initialValues={{
        condicoesTecnicas: '',
        conclusao: '',
      }}
      onSubmit={(values) => {

        handleNext(values); 
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
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Formulario5;
