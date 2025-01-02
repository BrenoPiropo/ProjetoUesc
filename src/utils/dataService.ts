import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para carregar todos os dados dos formulários (incluindo imagens)
export const getAllFormData = async () => {
  try {
    const formulario1Data = await AsyncStorage.getItem('formulario1Data');
    const formulario2Data = await AsyncStorage.getItem('formulario2Data');
    const formulario3Data = await AsyncStorage.getItem('formulario3Data');
    const formulario4Data = await AsyncStorage.getItem('formulario4Data');
    const formulario5Data = await AsyncStorage.getItem('formulario5Data');
    const formulario6Images = await AsyncStorage.getItem('formulario6Images');
    const formulario7Images = await AsyncStorage.getItem('formulario7Images');
    const formulario8Images = await AsyncStorage.getItem('formulario8Images');
    const formulario9Images = await AsyncStorage.getItem('formulario9Images');
    const formulario10Images = await AsyncStorage.getItem('formulario10Images');

    const allData = {
      ...(formulario1Data ? { formulario1Data: JSON.parse(formulario1Data) } : {}),
      ...(formulario2Data ? { formulario2Data: JSON.parse(formulario2Data) } : {}),
      ...(formulario3Data ? { formulario3Data: JSON.parse(formulario3Data) } : {}),
      ...(formulario4Data ? { formulario4Data: JSON.parse(formulario4Data) } : {}),
      ...(formulario5Data ? { formulario5Data: JSON.parse(formulario5Data) } : {}),
      // Assegura que as imagens sejam sempre arrays, mesmo quando não existirem
      formulario6Images: formulario6Images ? JSON.parse(formulario6Images) : [],
      formulario7Images: formulario7Images ? JSON.parse(formulario7Images) : [],
      formulario8Images: formulario8Images ? JSON.parse(formulario8Images) : [],
      formulario9Images: formulario9Images ? JSON.parse(formulario9Images) : [],
      formulario10Images: formulario10Images ? JSON.parse(formulario10Images) : [],
    };

    return allData;
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
    throw new Error('Não foi possível carregar os dados.');
  }
};

// Função para salvar imagens em AsyncStorage (verificando se são arrays de URIs)
export const saveImagesToForm = async (formKey, images) => {
  try {
    // Verifica se as imagens são um array válido
    if (Array.isArray(images)) {
      await AsyncStorage.setItem(formKey, JSON.stringify(images));
      console.log(`${formKey} salvo com sucesso!`);
    } else {
      throw new Error('As imagens devem ser um array de URIs válidos.');
    }
  } catch (error) {
    console.error(`Erro ao salvar imagens em ${formKey}:`, error);
    throw new Error(`Não foi possível salvar as imagens em ${formKey}.`);
  }
};