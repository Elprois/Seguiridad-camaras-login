
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../auth/AuthContext';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

import ReportIncidentScreen from '../screens/ReportIncidentScreen/ReportIncidentScreen';
import AddEvidenceScreen from '../screens/AddEvidenceScreen/AddEvidenceScreen';
import IncidentConfirmationScreen from '../screens/IncidentConfirmationScreen/IncidentConfirmationScreen';
import IncidentDetailScreen from '../screens/IncidentDetailScreen/IncidentDetailScreen';

// ... (other imports)

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ReportIncident" component={ReportIncidentScreen} />
            <Stack.Screen name="AddEvidence" component={AddEvidenceScreen} />
            <Stack.Screen name="IncidentConfirmation" component={IncidentConfirmationScreen} />
            <Stack.Screen name="IncidentDetail" component={IncidentDetailScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
