import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03045E', // Fundo preto
  },
  title: {
    color: '#fff', // Título branco
    fontSize: 24, // Tamanho grande
    textAlign: 'center',
    marginVertical: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cameraView: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraButtonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  cameraButtonText: {
    fontSize: 20,
    color: 'black',
  },
  capturedPhoto: {
    flex: 1,
    width: '100%',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  photoContainer: {
    margin: 5,
    position: 'relative',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  photoNumber: {
    color: '#fff', // Texto branco
    textAlign: 'center',
    marginTop: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 5,
  },
  deleteIcon: {
    color: '#fff',
    fontSize: 18,
  },
  newPhotoButton: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  newPhotoButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
