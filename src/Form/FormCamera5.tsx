import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles/CameraStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

interface Props {
  navigation: StackNavigationProp<any>;
  route: RouteProp<{ params: { photoCountRef: number } }, 'params'>;
}

const FormCamera5 = ({ navigation, route }: Props) => {
  const { photoCountRef: initialPhotoCount } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(true);
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
        setCapturedPhoto(result.assets[0].uri);
        setPhotos([...photos, result.assets[0].uri]);
        setShowGallery(true);
        photoCountRef.current = photoCountRef.current + 1;
      }
    } else {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à câmera para tirar fotos.');
    }
  };

  const deletePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    photoCountRef.current = photoCountRef.current - 1;
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setShowGallery(false);
  };

  const handleFinish = () => {
    Alert.alert(
      'Laudo Concluído',
      'O laudo foi concluído com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('UserInfo'), // Navegar para a tela UserInfo
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fotos do motor</Text>
      <View style={styles.contentContainer}>
        {showGallery ? (
          <>
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
            <TouchableOpacity style={styles.newPhotoButton} onPress={retakePhoto}>
              <Text style={styles.newPhotoButtonText}>Tirar nova foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleFinish}>
              <Text style={styles.submitButtonText}>Terminar Laudo</Text>
            </TouchableOpacity>
          </>
        ) : capturedPhoto ? (
          <Image source={{ uri: capturedPhoto }} style={styles.capturedPhoto} />
        ) : (
          <View style={styles.cameraContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
              <Text style={styles.cameraButtonText}>Tirar Foto</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default FormCamera5;
