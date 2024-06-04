import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { styles } from '../styles/FormStyles'
import { StackNavigationProp } from '@react-navigation/stack';

interface ConclusaoInputs {
  condicoesTecnicas?: string;
  conclusao?: string;
}

interface Props {
  onSubmit: (data: ConclusaoInputs) => void;
  navigation: StackNavigationProp<any>;
}

const Formulario5: React.FC<Props> = ({ onSubmit, navigation }) => {
    const handleNext = () => {
        navigation.navigate('FormularioCamera');
      };
  return (
    <Formik
      initialValues={{
        condicoesTecnicas: '',
        conclusao: '',
      }}
      onSubmit={(values) => {
        onSubmit(values);
        // Handle submission logic here
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
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
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Proximo</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Formulario5;
