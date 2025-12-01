
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Switch,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { useAuth } from '../../auth/AuthContext';
import { fetchEquipment, saveEquipmentSelection, fetchEquipmentCatalog } from '../../repositories/EquipmentRepository';

const EquipmentScreen = () => {
  const { user } = useAuth();
  const [equipment, setEquipment] = useState<any[]>([]);
  const [equipmentCatalog, setEquipmentCatalog] = useState<any[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const getIconName = (name: string) => {
    switch (name) {
      case 'Radio':
        return 'walkie-talkie';
      case 'Linterna':
        return 'flashlight';
      case 'Dispositivo Móvil':
        return 'phone-portrait';
      case 'Chaleco Antibalas':
        return 'shield-checkmark';
      default:
        return 'hardware-chip';
    }
  };

  const loadData = useCallback(async () => {
    if (!user?.id_usuario) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [assignedData, catalogData] = await Promise.all([
        fetchEquipment(user.id_usuario),
        fetchEquipmentCatalog(),
      ]);

      if (assignedData) {
        const assignedIds = assignedData
          .map(item => item.Equipo_Catalogo?.id_equipo)
          .filter(id => id != null);
        setSelectedEquipment(assignedIds as number[]);
        setEquipment(assignedData.map(item => ({
          id: item.id_asignacion,
          name: item.Equipo_Catalogo.nombre_equipo,
          subId: `ID: ${item.id_asignacion}`,
          icon: getIconName(item.Equipo_Catalogo.nombre_equipo),
          isActive: item.estado === 'Operativo',
        })));
      }

      if (catalogData) {
        setEquipmentCatalog(catalogData);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = async () => {
    if (!user?.id_usuario) return;

    const validSelectedEquipment = selectedEquipment.filter(id => id != null);

    setLoading(true);
    try {
      await saveEquipmentSelection(user.id_usuario, validSelectedEquipment);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false);
      Alert.alert('Éxito', 'La selección de equipo ha sido guardada.');
      loadData();
    }
  };

  const toggleSelection = (id: number) => {
    if (id == null) return;
    setSelectedEquipment(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderCatalogItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.iconContainer}>
        <Ionicons name={getIconName(item.nombre_equipo)} size={30} color={colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.nombre_equipo}</Text>
        <Text style={styles.subtitle}>{item.modelo}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={selectedEquipment.includes(item.id_equipo) ? colors.primary : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleSelection(item.id_equipo)}
          value={selectedEquipment.includes(item.id_equipo)}
        />
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pasar Revista a Equipo</Text>
      </View>
      <FlatList
        data={equipmentCatalog}
        renderItem={renderCatalogItem}
        keyExtractor={(item) => item.id_equipo.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="hardware-chip-outline" size={40} color="gray" />
            <Text style={styles.emptyText}>No hay equipo en el catálogo.</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D32',
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  list: {
    padding: 20,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#2A2D32',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#1A1F24',
    padding: 10,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'gray',
    fontSize: 14,
  },
  statusContainer: {
    marginLeft: 'auto',
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: 'gray',
    fontSize: 16,
    marginTop: 10,
  },
});

export default EquipmentScreen;

