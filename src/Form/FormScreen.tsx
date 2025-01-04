import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import { styles } from '../styles/FormStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormInputs {
  pericia: string;
  preambulo: string;
  historico: string;
  orgaoRequisitante: string;
  autoridadeRequisitante: string;
  guia: string;
  dataGuia: string;
  ocorrencia: string;
}

interface Props {
  onSubmit: (data: FormInputs) => void;
  navigation: StackNavigationProp<any>;
}

const Formulario: React.FC<Props> = ({ onSubmit, navigation }) => {
  const [allValues, setAllValues] = useState<FormInputs[]>([]);

  const handleNext = async (values: FormInputs) => {
    try {
      await AsyncStorage.setItem('formulario1Data', JSON.stringify(values));
      setAllValues((prevValues) => [...prevValues, values]);
      console.log("Todos os valores submetidos até agora:", [...allValues, values]);
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
    navigation.navigate('Exame');
  };

  return (
    <Formik
      initialValues={{ 
        pericia: '', 
        preambulo: '', 
        historico: '', 
        orgaoRequisitante: '',
        autoridadeRequisitante: '',
        guia: '',
        dataGuia: '',
        ocorrencia: '',
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
          <Text style={styles.exameTitle}>Home</Text>

          <TextInput
            style={styles.input}
            placeholder="Órgão Requisitante"
            onChangeText={handleChange('orgaoRequisitante')}
            onBlur={handleBlur('orgaoRequisitante')}
            value={values.orgaoRequisitante}
          />

          <TextInput
            style={styles.input}
            placeholder="Autoridade Requisitante"
            onChangeText={handleChange('autoridadeRequisitante')}
            onBlur={handleBlur('autoridadeRequisitante')}
            value={values.autoridadeRequisitante}
          />

          <TextInput
            style={styles.input}
            placeholder="Guia/Ofício"
            onChangeText={handleChange('guia')}
            onBlur={handleBlur('guia')}
            value={values.guia}
          />

          <TextInput
            style={styles.input}
            placeholder="Data Guia/Ofício"
            onChangeText={handleChange('dataGuia')}
            onBlur={handleBlur('dataGuia')}
            value={values.dataGuia}
          />

          <TextInput
            style={styles.input}
            placeholder="Ocorrência Policial"
            onChangeText={handleChange('ocorrencia')}
            onBlur={handleBlur('ocorrencia')}
            value={values.ocorrencia}
          />

          <TextInput
            style={styles.input}
            placeholder="Objetivo da Perícia"
            onChangeText={handleChange('pericia')}
            onBlur={handleBlur('pericia')}
            value={values.pericia}
          />

          <TextInput
            style={styles.input}
            placeholder="Preâmbulo"
            onChangeText={handleChange('preambulo')}
            onBlur={handleBlur('preambulo')}
            value={values.preambulo}
          />

          <TextInput
            style={styles.input}
            placeholder="Histórico"
            onChangeText={handleChange('historico')}
            onBlur={handleBlur('historico')}
            value={values.historico}
          />

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: (values.pericia && values.preambulo && values.historico && values.orgaoRequisitante && values.autoridadeRequisitante && values.guia && values.dataGuia && values.ocorrencia) ? 'blue' : 'gray' },
            ]}
            onPress={() => handleSubmit()}
            disabled={!(values.pericia && values.preambulo && values.historico && values.orgaoRequisitante && values.autoridadeRequisitante && values.guia && values.dataGuia && values.ocorrencia)}
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Formulario;
