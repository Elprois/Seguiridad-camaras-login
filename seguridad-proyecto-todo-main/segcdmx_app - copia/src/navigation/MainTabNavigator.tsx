
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import IncidentsScreen from '../screens/IncidentsScreen/IncidentsScreen';
import EquipmentScreen from '../screens/EquipmentScreen/EquipmentScreen';
import ProfileNavigator from './ProfileNavigator';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Incidentes') {
            iconName = focused ? 'alert-circle' : 'alert-circle-outline';
          } else if (route.name === 'Equipo') {
            iconName = focused ? 'shield' : 'shield-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.background,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Incidentes" component={IncidentsScreen} />
      <Tab.Screen name="Equipo" component={EquipmentScreen} />
      <Tab.Screen name="Perfil" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
