import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles/CameraStyles';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

const FormCamera = ({ navigation }: Props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showGallery, setShowGallery] = useState(true);
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
        setCapturedPhoto(result.assets[0].uri);
        setPhotos([...photos, result.assets[0].uri]);
        setShowGallery(true);
        photoCountRef.current = photoCountRef.current + 1;
      }
    } else {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à câmera para tirar fotos.');
    }
  };

  const deletePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    photoCountRef.current = photoCountRef.current - 1;
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setShowGallery(false);
  };

  const handleNext = () => {
    navigation.navigate('Fotos das placas', { photoCountRef: photoCountRef.current });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fotos do Veículo</Text>
      <View style={styles.contentContainer}>
        {showGallery ? (
          <>
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
            <TouchableOpacity style={styles.newPhotoButton} onPress={retakePhoto}>
              <Text style={styles.newPhotoButtonText}>Tirar nova foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
              <Text style={styles.submitButtonText}>Próximo</Text>
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

export default FormCamera;
