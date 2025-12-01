

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../auth/AuthContext';
import { supabase } from '../../services/supabase';
import { colors } from '../../theme/colors';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';

interface UserProfile {
  nombre: string;
  apellido: string;
  rol: string;
  estado: string;
  avatar_url: string | null;
}

const MenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <MaterialIcons name={icon} size={24} color="#8A95A0" />
    <Text style={styles.menuItemText}>{title}</Text>
    <MaterialIcons name="chevron-right" size={24} color="#8A95A0" />
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const { signOut, user: authUser, refreshUserProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (authUser) {
      setProfile({
        nombre: authUser.nombre,
        apellido: authUser.apellido,
        rol: authUser.rol,
        estado: authUser.estado,
        avatar_url: authUser.avatar_url,
      });
    }
    setLoading(false);
  }, [authUser]);


  const handlePickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para cambiar el avatar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return;
    }

    const image = result.assets[0];
    const base64 = image.base64;
    const filePath = `${authUser!.id}/${new Date().getTime()}.png`;
    const contentType = 'image/png';

    setUploading(true);
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, decode(base64), { contentType });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(data.path);

      const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });


      if (updateError) throw updateError;
      
      await refreshUserProfile();

      Alert.alert('Éxito', 'Tu foto de perfil ha sido actualizada.');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      Alert.alert('Error', 'No se pudo actualizar la foto de perfil.');
    } finally {
      setUploading(false);
    }
  };


  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FFF" />
      </SafeAreaView>
    );
  }

  const getInitials = (name: string = '') => (name ? name.charAt(0).toUpperCase() : '');

  return (
    <SafeAreaView style={styles.container}>
      {profile && (
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePickAvatar} disabled={uploading}>
            <View style={styles.avatar}>
              {uploading ? (
                <ActivityIndicator color="#FFF" />
              ) : profile.avatar_url ? (
                <Image source={{ uri: profile.avatar_url }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>{getInitials(profile.nombre)}</Text>
              )}
                 <View style={styles.editIconContainer}>
                <MaterialIcons name="edit" size={20} color="white" />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>{`${profile.nombre} ${profile.apellido}`}</Text>
          <Text style={styles.userRole}>{profile.rol}</Text>
        </View>
      )}

      <View style={styles.menuContainer}>
        <MenuItem icon="calendar-today" title="Historial de Asistencia" onPress={() => navigation.navigate('AttendanceHistory')} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1F24',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#343B43',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2196F3',
    borderRadius: 15,
    padding: 5,
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userRole: {
    color: '#8A95A0',
    fontSize: 16,
    marginTop: 4,
  },
  menuContainer: {
    flex: 1,
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  menuItemText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    marginLeft: 16,
  },
  logoutButton: {
    borderColor: '#D32F2F',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

