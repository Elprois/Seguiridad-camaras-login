import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { useAuth } from '../../auth/AuthContext';
import { fetchRecentIncidents } from '../../incident/IncidentRepository';

const IncidentsScreen = ({ navigation }) => {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos'); // 'Todos', 'Bajo', 'Medio', 'Alto'
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    };

    const loadIncidents = async () => {
      setLoading(true);
      try {
        const data = await fetchRecentIncidents();
        setIncidents(data);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert('Error al cargar incidentes', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadIncidents();
  }, [user]);

  const groupedAndFilteredIncidents = useMemo(() => {
    const filtered = incidents.filter(item => {
      if (filter === 'Todos') return true;
      return item.prioridad === filter;
    });

    const grouped = filtered.reduce((acc, incident) => {
      const date = new Date(incident.fecha_hora_reporte).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(incident);
      return acc;
    }, {});

    return Object.keys(grouped).map(date => ({
      title: date,
      data: grouped[date],
    }));
  }, [incidents, filter]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alto':
        return '#D32F2F'; // Red
      case 'Medio':
        return '#FBC02D'; // Yellow
      case 'Bajo':
        return '#388E3C'; // Green
      default:
        return 'gray';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('IncidentDetail', { incidentId: item.id_incidente })}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.incidentType}>{item.Tipos_Incidente?.nombre_tipo || 'Tipo no disponible'}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getPriorityColor(item.prioridad) }]}>
            <Text style={styles.statusText}>{item.prioridad}</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.detailText}>ID: {item.id_incidente}</Text>
          <Text style={styles.detailText}>Autor: {item.Usuarios ? `${item.Usuarios.nombre} ${item.Usuarios.apellido}` : 'No disponible'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const FilterButtons = () => (
    <View style={styles.filterContainer}>
      {['Todos', 'Bajo', 'Medio', 'Alto'].map(p => (
        <TouchableOpacity
          key={p}
          style={[styles.filterButton, filter === p && styles.filterButtonSelected]}
          onPress={() => setFilter(p)}
        >
          <Text style={[styles.filterButtonText, filter === p && styles.filterButtonTextSelected]}>{p}</Text>
        </TouchableOpacity>
      ))}
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
        <Text style={styles.headerTitle}>Incidentes Recientes</Text>
      </View>
      <FilterButtons />
      <SectionList
        sections={groupedAndFilteredIncidents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_incidente.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyListText}>No hay incidentes para mostrar.</Text>}
      />
      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => navigation.navigate('ReportIncident')}
      >
        <Ionicons name="add-circle" size={24} color="white" />
        <Text style={styles.reportButtonText}>Reportar Nuevo Incidente</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#2A2D32',
  },
  filterButtonSelected: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    color: 'white',
  },
  filterButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#2A2D32',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  incidentType: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: '#3A3D42',
    paddingTop: 10,
  },
  detailText: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 5,
  },
  reportButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 20,
    borderRadius: 8,
  },
  reportButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  emptyListText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  }
});

export default IncidentsScreen;