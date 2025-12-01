
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useAuth } from '../../auth/AuthContext';
import { supabase } from '../../services/supabase';
import { colors } from '../../theme/colors';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import { MaterialIcons } from '@expo/vector-icons';

interface Asistencia {
  id_registro: number;
  check_in_time: string;
  check_out_time: string | null;
}

const AttendanceHistoryScreen = () => {
  const { user: authUser } = useAuth();
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceHistory = async () => {
      if (!authUser) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('Registros_Asistencia')
          .select('id_registro, check_in_time, check_out_time')
          .eq('id_usuario', authUser.id_usuario)
          .order('check_in_time', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setAsistencias(data);
        }
      } catch (error) {
        console.error('Error fetching attendance history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceHistory();
  }, [authUser]);

  const renderItem = ({ item }: { item: Asistencia }) => {
    const checkInDate = new Date(item.check_in_time);
    const checkOutDate = item.check_out_time ? new Date(item.check_out_time) : null;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateDay}>{format(checkInDate, 'dd')}</Text>
          <Text style={styles.dateMonth}>{format(checkInDate, 'MMM', { locale: es })}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.timeRow}>
            <MaterialIcons name="login" size={20} color="#8A95A0" />
            <Text style={styles.itemText}>
              Entrada: {format(checkInDate, 'p', { locale: es })}
            </Text>
          </View>
          <View style={styles.timeRow}>
            <MaterialIcons name="logout" size={20} color="#8A95A0" />
            <Text style={styles.itemText}>
              Salida: {checkOutDate ? format(checkOutDate, 'p', { locale: es }) : 'No registrado'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Historial de Asistencia</Text>
      <FlatList
        data={asistencias}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_registro.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay registros de asistencia.</Text>}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A3138',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
  },
  dateContainer: {
    backgroundColor: '#39424B',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  dateDay: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  dateMonth: {
    color: '#8A95A0',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  infoContainer: {
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  emptyText: {
    color: '#8A95A0',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});

export default AttendanceHistoryScreen;
