import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles/CameraStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { generatePDF } from '../utils/generatePdf'; // Função para gerar o PDF
import { getAllFormData, saveImagesToForm } from '../utils/dataService'; // Funções para manipular o AsyncStorage

interface Props {
  navigation: StackNavigationProp<any>;
  route: RouteProp<{ params: { photoCountRef: number } }, 'params'>;
}

const FormCamera5 = ({ navigation, route }: Props) => {
  const { photoCountRef: initialPhotoCount } = route.params;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const photoCountRef = useRef<number>(initialPhotoCount);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (hasPermission) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
        photoCountRef.current = photoCountRef.current + 1;
      }
    } else {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à câmera para tirar fotos.');
    }
  };

  const deletePhoto = (index: number) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos.splice(index, 1);
      return updatedPhotos;
    });
    photoCountRef.current = photoCountRef.current - 1;
  };

  const handleFinish = async () => {
    try {
      // Salvar as imagens do FormCamera5 no AsyncStorage
      await saveImagesToForm('formulario10Images', photos);
      console.log('Imagens do FormCamera5 salvas com sucesso:', photos);

      // Recuperar todos os dados para gerar o PDF
      const allFormData = await getAllFormData();
      console.log('Dados recuperados:', allFormData);

      // Gerar o PDF
      await generatePDF(allFormData);
      console.log('PDF gerado com sucesso!');

      Alert.alert('Laudo Concluído', 'O laudo foi concluído e o PDF foi gerado com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('UserInfo'),
        },
      ]);
    } catch (error) {
      console.error('Erro ao finalizar o laudo:', error);
      Alert.alert('Erro', 'Houve um problema ao gerar o PDF. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fotos do motor</Text>
      <View style={styles.contentContainer}>
        <View style={styles.photosContainer}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
              <Text style={styles.photoNumber}>Foto {initialPhotoCount + index + 1}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deletePhoto(index)}>
                <AntDesign name="closecircleo" style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
          <Text style={styles.newPhotoButtonText}>Tirar nova foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newPhotoButton} onPress={handleFinish}>
          <Text style={styles.submitButtonText}>Terminar Laudo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormCamera5;
