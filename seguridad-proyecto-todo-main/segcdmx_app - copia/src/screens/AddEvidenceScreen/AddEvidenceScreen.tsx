
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../theme/colors';

const AddEvidenceScreen = ({ navigation }) => {
  const [evidence, setEvidence] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const handleGoBack = () => {
    navigation.navigate('ReportIncident', { mediaUris: evidence.map(e => e.uri) });
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setEvidence([...evidence, ...result.assets]);
    }
  };

  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      setEvidence([...evidence, ...result.assets]);
    }
  };

  const removeEvidence = (uri: string) => {
    setEvidence(evidence.filter((item) => item.uri !== uri));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adjuntar Evidencia</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={openCamera}>
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.buttonText}>ABRIR CÁMARA (Foto / Video)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#2A2D32' }]} onPress={openGallery}>
          <Ionicons name="images" size={24} color="white" />
          <Text style={styles.buttonText}>Seleccionar de Galería</Text>
        </TouchableOpacity>

        <Text style={styles.helpText}>
          Puede adjuntar hasta 5 fotos o 30 segundos de video
        </Text>

        <View style={styles.grid}>
          {evidence.map((item, index) => (
            <ImageBackground
              key={index}
              source={{ uri: item.uri }}
              style={styles.gridItem}
              imageStyle={{ borderRadius: 8 }}
            >
              {item.type === 'video' && (
                <View style={styles.playIconContainer}>
                  <Ionicons name="play-circle" size={40} color="white" />
                </View>
              )}
              <TouchableOpacity style={styles.deleteButton} onPress={() => removeEvidence(item.uri)}>
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </ImageBackground>
          ))}
          {evidence.length < 5 && (
            <TouchableOpacity style={styles.addPlaceholder} onPress={openGallery}>
              <Ionicons name="image-outline" size={40} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.sendButton} onPress={handleGoBack}>
          <Text style={styles.sendButtonText}>Volver al Reporte</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D32',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  helpText: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  addPlaceholder: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2D32',
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddEvidenceScreen;

