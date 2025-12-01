
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { CommonActions } from '@react-navigation/native';

const IncidentConfirmationScreen = ({ navigation }) => {
  const [isOffline, setIsOffline] = useState(false); // Set to true to see the offline state

  const handleGoHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  const successState = {
    icon: 'checkmark',
    iconColor: '#4CAF50',
    backgroundColor: '#1B5E20',
    title: 'Incidente Reportado',
    message: 'El incidente [ID-123] ha sido enviado correctamente.',
  };

  const offlineState = {
    icon: 'cloud-offline',
    iconColor: '#FF9800',
    backgroundColor: '#E65100',
    title: 'Incidente Guardado (Sin Conexión)',
    message:
      'No hay conexión a internet. El incidente se ha guardado localmente y se enviará automáticamente cuando recuperes la conexión.',
  };

  const currentState = isOffline ? offlineState : successState;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: currentState.backgroundColor }]}>
          <Ionicons name={currentState.icon} size={80} color={currentState.iconColor} />
        </View>
        <Text style={styles.title}>{currentState.title}</Text>
        <Text style={styles.message}>{currentState.message}</Text>
      </View>

      {/* Temporary button to toggle state for testing */}
      <TouchableOpacity style={styles.toggleButton} onPress={() => setIsOffline(!isOffline)}>
        <Text style={styles.toggleButtonText}>Toggle State</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>Volver al Inicio</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  message: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
  },
  homeButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#2A2D32',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  toggleButtonText: {
    color: 'white',
  },
});

export default IncidentConfirmationScreen;

