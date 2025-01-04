import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles/CameraStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { saveImagesToForm } from '../utils/dataService'; // Importe o serviço atualizado

interface Props {
  navigation: StackNavigationProp<any>;
  route: RouteProp<{ params: { photoCountRef: number } }, 'params'>;
}

const FormCamera3 = ({ navigation, route }: Props) => {
  const { photoCountRef: initialPhotoCount } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [photos, setPhotos] = useState([]);
  const photoCountRef = useRef(initialPhotoCount);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (hasPermission) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newPhotos = [...photos, result.assets[0].uri];
        setPhotos(newPhotos);
        photoCountRef.current = photoCountRef.current + 1;

        // Salve as imagens no AsyncStorage
        await saveImagesToForm('formulario8Images', newPhotos);
      }
    } else {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à câmera para tirar fotos.');
    }
  };

  const deletePhoto = async (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    photoCountRef.current = photoCountRef.current - 1;

    // Atualize as imagens no AsyncStorage
    await saveImagesToForm('formulario8Images', updatedPhotos);
  };

  const retakePhoto = () => {
    Alert.alert('Atenção', 'Deseja realmente descartar todas as fotos?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sim', onPress: () => setPhotos([]) },
    ]);
  };

  const handleNext = () => {
    navigation.navigate('Fotos do chassi', { photoCountRef: photoCountRef.current });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fotos dos Vidros</Text>
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
          <Text style={styles.cameraButtonText}>Tirar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
          <Text style={styles.submitButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormCamera3;
