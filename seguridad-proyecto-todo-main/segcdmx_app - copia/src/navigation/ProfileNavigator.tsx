
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import AttendanceHistoryScreen from '../screens/AttendanceHistoryScreen/AttendanceHistoryScreen';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AttendanceHistory" component={AttendanceHistoryScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
