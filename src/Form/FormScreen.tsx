import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import { styles } from '../styles/FormStyles';
import { StackNavigationProp } from '@react-navigation/stack';

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
  const handleNext = () => {
    navigation.navigate('Exame');
  };

  return (
    <Formik
      initialValues={{ pericia: '', preambulo: '', historico: '' }}
      onSubmit={(values) => {
        onSubmit(values);
        handleNext();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
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
            style={[styles.button, {backgroundColor: (values.pericia && values.preambulo && values.historico) ? 'blue' : 'gray'}]}
            onPress={handleNext}
            disabled={!(values.pericia && values.preambulo && values.historico)}
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Formulario;
