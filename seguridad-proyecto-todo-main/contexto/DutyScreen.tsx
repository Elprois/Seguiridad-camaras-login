
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import mapaImage from '../../../assets/mapa.webp';
import { colors } from '../../theme/colors';
import { useAuth } from '../../auth/AuthContext';
import { 
  getCurrentShiftForUser, 
  performCheckIn,
  getActiveCheckIn,
  performCheckOut,
  getAvailableShifts
} from '../../duty/DutyRepository';

const DutyScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableShifts, setAvailableShifts] = useState([]);
  const [selectedShiftId, setSelectedShiftId] = useState(null);

  useEffect(() => {
    const checkDutyStatusAndLoadShifts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const activeCheckIn = await getActiveCheckIn(user.id_usuario);
        setIsOnDuty(!!activeCheckIn);

        if (!activeCheckIn) { // Only load available shifts if off-duty
          const shifts = await getAvailableShifts(user.id_usuario);
          setAvailableShifts(shifts);
        }
      } catch (error) {
        console.error('Failed to load duty status or shifts:', error);
      } finally {
        setLoading(false);
      }
    };
    checkDutyStatusAndLoadShifts();
  }, [user]);

  const handleCheckIn = async () => {
    if (!user) {
      Alert.alert('Error', 'No te has autenticado.');
      return;
    }
    if (!selectedShiftId) {
      Alert.alert('Selecciona Turno', 'Por favor, elige un turno de la lista para hacer check-in.');
      return;
    }

    setLoading(true);
    try {
      // The currentShift check is now replaced by user selecting a shift
      // from availableShifts. We just need to ensure the selectedShiftId is valid.
      await performCheckIn(selectedShiftId, user.id_usuario);
      Alert.alert('Éxito', 'Check-in realizado correctamente.');
      setIsOnDuty(true);
      setSelectedShiftId(null); // Clear selection after check-in
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error en Check-in', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!user) {
      Alert.alert('Error', 'No te has autenticado.');
      return;
    }
    setLoading(true);
    try {
      const activeCheckIn = await getActiveCheckIn(user.id_usuario);
      if (!activeCheckIn) {
        Alert.alert('Error', 'No se encontró un check-in activo para realizar el check-out.');
        setLoading(false);
        return;
      }
      await performCheckOut(activeCheckIn.id_registro);
      Alert.alert('Éxito', 'Check-out realizado correctamente.');
      setIsOnDuty(false);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error en Check-out', error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleReportIncident = () => navigation.navigate('ReportIncident');

  const renderShiftItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.shiftCard,
        selectedShiftId === item.id_turno && styles.selectedShiftCard,
      ]}
      onPress={() => setSelectedShiftId(item.id_turno)}
    >
      <View style={styles.shiftCardHeader}>
        <Text style={styles.shiftCardTitle}>{item.Zonas?.nombre_zona || 'Zona no disponible'}</Text>
        <Ionicons 
          name={selectedShiftId === item.id_turno ? 'checkmark-circle' : 'radio-button-off'} 
          size={24} 
          color={selectedShiftId === item.id_turno ? colors.primary : 'gray'} 
        />
      </View>
      <Text style={styles.shiftCardDetail}>
        Inicio: {new Date(item.fecha_hora_inicio).toLocaleString()}
      </Text>
      <Text style={styles.shiftCardDetail}>
        Fin: {new Date(item.fecha_hora_fin).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  const OffDuty = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bienvenido, Carlos</Text>
        <Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Tus Turnos Disponibles</Text>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : availableShifts.length > 0 ? (
          <FlatList
            data={availableShifts}
            keyExtractor={(item) => item.id_turno.toString()}
            renderItem={renderShiftItem}
            contentContainerStyle={styles.shiftsList}
            ListEmptyComponent={<Text style={styles.emptyListText}>No hay turnos disponibles para ti.</Text>}
          />
        ) : (
          <Text style={styles.emptyListText}>No hay turnos disponibles para ti.</Text>
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn} disabled={loading || !selectedShiftId}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>HACER CHECK-IN</Text>}
        </TouchableOpacity>
      </View>
    </>
  );

  const OnDuty = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GuardPro</Text>
        <Ionicons name="menu" size={30} color="white" />
      </View>
      <View style={styles.content}>
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>TURNO ACTIVO</Text>
          <View style={styles.gpsStatus}>
            <Ionicons name="navigate-circle-outline" size={16} color="#4CAF50" />
            <Text style={styles.gpsText}>Seguimiento GPS activo</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.reportButton} onPress={handleReportIncident}>
          <Text style={styles.buttonText}>REPORTAR INCIDENTE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkOutButton} onPress={handleCheckOut} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>HACER CHECK-OUT</Text>}
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isOnDuty ? <OnDuty /> : <OffDuty />}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start', // Changed from center to flex-start
    padding: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  shiftsList: {
    paddingBottom: 20,
  },
  shiftCard: {
    backgroundColor: '#2A2D32',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedShiftCard: {
    borderColor: colors.primary,
  },
  shiftCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  shiftCardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  shiftCardDetail: {
    color: 'gray',
    fontSize: 14,
  },
  statusCard: {
    backgroundColor: '#1B5E20',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  statusTitle: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gpsStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gpsText: {
    color: 'white',
    marginLeft: 5,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1, // Add border to separate footer
    borderTopColor: '#2A2D32',
  },
  checkInButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportButton: {
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkOutButton: {
    backgroundColor: '#2A2D32',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyListText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  }
});

export default DutyScreen;

