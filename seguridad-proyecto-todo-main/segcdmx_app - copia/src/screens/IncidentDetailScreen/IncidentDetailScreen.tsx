import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fetchIncidentDetails } from '../../incident/IncidentRepository';

const IncidentDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { incidentId } = route.params;

  const [incident, setIncident] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      if (!incidentId) {
        Alert.alert('Error', 'No se ha proporcionado un ID de incidente.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await fetchIncidentDetails(incidentId);
        setIncident(data);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert('Error', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [incidentId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!incident) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No se pudieron cargar los detalles del incidente.</Text>
      </SafeAreaView>
    );
  }
  
  const evidence = incident.Evidencias_Incidente || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Incidente</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>ID Incidente:</Text>
          <Text style={styles.value}>{incident.id_incidente}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>{incident.Tipos_Incidente?.nombre_tipo || 'No disponible'}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Fecha y Hora:</Text>
          <Text style={styles.value}>{new Date(incident.fecha_hora_reporte).toLocaleString()}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Reportado por:</Text>
          <Text style={styles.value}>{incident.Usuarios ? `${incident.Usuarios.nombre} ${incident.Usuarios.apellido}` : 'No disponible'}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.value}>{incident.descripcion || 'Sin descripción.'}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Estado:</Text>
          <Text style={styles.value}>{incident.estado_sincronizacion}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Prioridad:</Text>
          <Text style={styles.value}>{incident.prioridad || 'No definida'}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.label}>Evidencia:</Text>
          {evidence.length > 0 ? (
            <FlatList
              horizontal
              data={evidence}
              keyExtractor={(item) => item.id_evidencia.toString()}
              renderItem={({ item }) => (
                <Image source={{ uri: item.url_archivo }} style={styles.evidenceImage} />
              )}
            />
          ) : (
            <Text style={styles.value}>No hay evidencia adjunta.</Text>
          )}
        </View>
      </ScrollView>
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
  card: {
    backgroundColor: '#2A2D32',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  label: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 5,
  },
  value: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  evidenceImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  }
});

export default IncidentDetailScreen;