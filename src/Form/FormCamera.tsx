import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles/CameraStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { saveImagesToForm } from '../utils/dataService'; // Importe o serviço atualizado

interface Props {
  navigation: StackNavigationProp<any>;
}

const FormCamera = ({ navigation }: Props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photos, setPhotos] = useState([]);
  const photoCountRef = useRef(0);

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
        await saveImagesToForm('formulario6Images', newPhotos);
      }
    } else {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à câmera para tirar fotos.');
    }
  };

  const deletePhoto = async (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    photoCountRef.current = photoCountRef.current - 1;

    // Atualize no AsyncStorage
    await saveImagesToForm('formulario6Images', updatedPhotos);
  };

  const handleNext = () => {
    navigation.navigate('Fotos das placas', { photoCountRef: photoCountRef.current });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fotos do Veículo</Text>
      <View style={styles.contentContainer}>
        <View style={styles.photosContainer}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
              <Text style={styles.photoNumber}>Foto {index + 1}</Text>
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

export default FormCamera;
