import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Background from '../components/Background';
import CustomHeader from '../components/CustomHeader';
import MedicationCard from '../components/MedicationCard';
import DoctorBottomBar from '../components/DoctorBottomBar';
import { useNavigation } from '@react-navigation/native';
import AppointmentCard from '../components/AppoinmentCard'; // Corrected import statement
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../appconfig';

export default function DoctorDashboard() {
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const token = await AsyncStorage.getItem('user_id');
        console.log(token)
        try {
            const response = await axios.post(`${BASE_URL}/doctor/allappoitment`, {
                doctorId: token,
            });
            setAppointments(response.data.appointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
        });
    };

    const handleMedicationPress = (medication) => {
        navigation.navigate('AppointmentDetails', { medication });
    };
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="MedChronicle" onLogoutPress={handleLogout} />
            <Background style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                        {appointments.map((medication) => (
                            <AppointmentCard
                                key={medication._id}
                                appointment={medication}
                                onPress={() => handleMedicationPress(medication)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </Background>
            <DoctorBottomBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 20,
        // paddingTop: 20,
    },
    scrollView: {
        // flexGrow: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});