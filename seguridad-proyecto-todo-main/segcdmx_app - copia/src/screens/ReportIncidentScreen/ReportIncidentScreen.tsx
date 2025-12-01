
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { useAuth } from '../../auth/AuthContext';
import { createIncident, fetchIncidentTypes } from '../../incident/IncidentRepository';

const ReportIncidentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();

  const [incidentTypes, setIncidentTypes] = useState<any[]>([]);
  const [selectedIncidentType, setSelectedIncidentType] = useState<any | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [incidentDescription, setIncidentDescription] = useState('');
  const [priority, setPriority] = useState('Bajo');
  const [mediaUris, setMediaUris] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  // A real app would get this from a location service like Expo's Location API
  const [location, setLocation] = useState({ lat: 19.4326, long: -99.1332 }); 

  useEffect(() => {
    // The user might navigate back and forth, so we get mediaUris from params
    if (route.params?.mediaUris) {
      setMediaUris(route.params.mediaUris);
    }
  }, [route.params?.mediaUris]);

  useEffect(() => {
    const loadIncidentTypes = async () => {
      try {
        const types = await fetchIncidentTypes();
        setIncidentTypes(types);
      } catch (error) {
        if(error instanceof Error) {
          Alert.alert('Error', error.message);
        }
      }
    };
    loadIncidentTypes();
  }, []);

  const handleSubmit = async () => {
    if (!selectedIncidentType) {
      Alert.alert('Campo requerido', 'Por favor, selecciona un tipo de incidente.');
      return;
    }
    if (!incidentDescription.trim()) {
      Alert.alert('Campo requerido', 'Por favor, añade una descripción del incidente.');
      return;
    }
    if (!user?.id_usuario) {
      Alert.alert('Error de autenticación', 'No se pudo verificar tu sesión. Por favor, inicia sesión de nuevo.');
      return;
    }

    setLoading(true);
    try {
      await createIncident({
        typeId: selectedIncidentType.id_tipo_incidente,
        description: incidentDescription,
        lat: location.lat,
        long: location.long,
        mediaFiles: mediaUris,
        id_usuario: user.id_usuario,
        prioridad: priority,
      });
      
      Alert.alert('Éxito', 'El incidente ha sido reportado correctamente.');
      navigation.navigate('IncidentConfirmation');

    } catch (error) {
      console.error('Submit Incident Failed:', JSON.stringify(error, null, 2));
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
      Alert.alert('Error al reportar', `No se pudo enviar el incidente. Por favor, inténtalo de nuevo. \n\nError: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectIncidentType = (type: any) => {
    setSelectedIncidentType(type);
    setDropdownVisible(false);
  };
  
  const navigateToAddEvidence = () => {
    // Navigate to AddEvidence, passing current form state
    navigation.navigate('AddEvidence', {
      incidentDescription,
      selectedIncidentType,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reportar Incidente</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Tipo de Incidente</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setDropdownVisible(true)}>
            <Text style={styles.dropdownText}>
              {selectedIncidentType?.nombre_tipo || 'Seleccionar tipo'}
            </Text>
            <Ionicons name="chevron-down" size={24} color="gray" />
          </TouchableOpacity>

          <Text style={styles.label}>Descripción del Incidente</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describa detalladamente lo sucedido..."
            placeholderTextColor="gray"
            multiline
            textAlignVertical="top"
            value={incidentDescription}
            onChangeText={setIncidentDescription}
          />
          
          <Text style={styles.label}>Prioridad</Text>
          <View style={styles.priorityContainer}>
            <TouchableOpacity 
              style={[styles.priorityButton, priority === 'Bajo' && styles.priorityButtonSelectedBajo]} 
              onPress={() => setPriority('Bajo')}
            >
              <Text style={styles.priorityButtonText}>Bajo</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.priorityButton, priority === 'Medio' && styles.priorityButtonSelectedMedio]} 
              onPress={() => setPriority('Medio')}
            >
              <Text style={styles.priorityButtonText}>Medio</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.priorityButton, priority === 'Alto' && styles.priorityButtonSelectedAlto]} 
              onPress={() => setPriority('Alto')}
            >
              <Text style={styles.priorityButtonText}>Alto</Text>
            </TouchableOpacity>
          </View>

          
          <Text style={styles.label}>Evidencia adjunta</Text>
          {mediaUris.length > 0 && (
            <FlatList
              horizontal
              data={mediaUris}
              keyExtractor={(uri) => uri}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.previewImage} />
              )}
              style={styles.previewList}
            />
          )}
          <TouchableOpacity style={styles.evidenceButton} onPress={navigateToAddEvidence}>
             <Ionicons name="camera" size={20} color={colors.primary} />
            <Text style={styles.evidenceButtonText}>
              {mediaUris.length > 0 ? `Modificar evidencia (${mediaUris.length} archivos)` : 'Adjuntar fotos o videos'}
            </Text>
          </TouchableOpacity>

          <View style={styles.mapContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/300x150.png?text=Ubicacion+del+Incidente' }}
              style={styles.mapImage}
            />
            <View style={styles.locationOverlay}>
              <Ionicons name="locate" size={20} color="#2E7D32" />
              <Text style={styles.locationText}>Ubicación del Incidente Capturada</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Enviar Reporte</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal
        transparent={true}
        visible={isDropdownVisible}
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownModal}>
            <FlatList
              data={incidentTypes}
              keyExtractor={(item) => item.id_tipo_incidente.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelectIncidentType(item)}
                >
                  <Text style={styles.dropdownItemText}>{item.nombre_tipo}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A2D32',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  dropdownText: {
    color: 'white',
    fontSize: 16,
  },
  textArea: {
    backgroundColor: '#2A2D32',
    borderRadius: 8,
    color: 'white',
    fontSize: 16,
    height: 120,
    padding: 15,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priorityButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#2A2D32',
    marginHorizontal: 5,
  },
  priorityButtonSelectedBajo: {
    backgroundColor: '#388E3C', // Green
  },
  priorityButtonSelectedMedio: {
    backgroundColor: '#FBC02D', // Yellow
  },
  priorityButtonSelectedAlto: {
    backgroundColor: '#D32F2F', // Red
  },
  priorityButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  evidenceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2D32',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  evidenceButtonText: {
    color: colors.primary,
    fontSize: 16,
    marginLeft: 10,
  },
  previewList: {
    marginBottom: 20,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  mapContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: 150,
  },
  locationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  locationText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2D32',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: '#2A2D32',
    borderRadius: 8,
    width: '80%',
    maxHeight: '50%',
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3D42',
  },
  dropdownItemText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ReportIncidentScreen;

