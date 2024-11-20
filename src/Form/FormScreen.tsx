import React from 'react';
import { ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import { styles } from '../styles/FormStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormInputs {
  pericia: string;
  preambulo: string;
  historico: string;
}

interface Props {
  onSubmit: (data: FormInputs) => void;
  navigation: StackNavigationProp<any>;
}

const Formulario: React.FC<Props> = ({ onSubmit, navigation }) => {
  const handleNext = async (values: FormInputs) => {
    try {
      await AsyncStorage.setItem('formData', JSON.stringify(values));
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }

    navigation.navigate('Exame');
  };

  return (
    <Formik
      initialValues={{ pericia: '', preambulo: '', historico: '' }}
      onSubmit={(values) => {
        if (onSubmit) {
          onSubmit(values); 
        }
        handleNext(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.exameTitle}>Home</Text>
          <TextInput
            style={[styles.input, { height: 150 }]}
            placeholder="Objetivo da Perícia"
            onChangeText={handleChange('pericia')}
            onBlur={handleBlur('pericia')}
            value={values.pericia}
          />
          <TextInput
            style={[styles.input, { height: 150 }]}
            placeholder="Preâmbulo"
            onChangeText={handleChange('preambulo')}
            onBlur={handleBlur('preambulo')}
            value={values.preambulo}
          />
          <TextInput
            style={[styles.input, { height: 150 }]}
            placeholder="Histórico"
            onChangeText={handleChange('historico')}
            onBlur={handleBlur('historico')}
            value={values.historico}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: (values.pericia && values.preambulo && values.historico) ? 'blue' : 'gray' }]}
            onPress={() => handleSubmit()} 
            disabled={!(values.pericia && values.preambulo && values.historico)}
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Formulario;
