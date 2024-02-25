import React from 'react'

import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'
import MedicationDetail from './src/screens/MedicationDetail'
import Search from './src/screens/Search'
import DoctorDetails from './src/screens/DoctorDetails'
import HistoryCard from './src/screens/HistoryCard'
import UserProfile from './src/screens/UserProfile'
import DoctorDashBoard from './src/screens/DoctorDashBoard'
import AppointmentDetails from './src/screens/AppointmentDetails'
import MeetingScreen from './src/screens/MeetingScreen'
import { PharmacistDashBoard } from './src/screens/PharmacistDashBoard'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="MedicationDetails" component={MedicationDetail} />
          <Stack.Screen name="DoctorDetails" component={DoctorDetails} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="History" component={HistoryCard} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="DoctorDashBoard" component={DoctorDashBoard} />
          <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
          <Stack.Screen name="MeetingScreen" component={MeetingScreen} />
          <Stack.Screen name="PharmacistDashBoard" component={PharmacistDashBoard} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}