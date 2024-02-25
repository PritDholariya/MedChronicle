import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Background from '../components/Background';
import CustomHeader from '../components/CustomHeader';
import PharmacistBottomBar from '../components/PharmacistBottomBar';
import { useNavigation } from '@react-navigation/native';
import AppoinmentCard from '../components/AppoinmentCard';

export function PharmacistDashBoard() {
    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
        });
    };

    const handleMedicationPress = (medication) => {
        navigation.navigate('AppointmentDetails', { medication });
    };

    // Example medication data
    const medications = [
        { id: 1, patientname: 'Medication A', time: '8:00 AM', date: '1 pill' },
        { id: 10, patientname: 'Medication A', time: '8:00 AM', date: '1 pill' },
        { id: 174, patientname: 'Medication A', time: '8:00 AM', date: '1 pill' },
        { id: 142, patientname: 'Medication A', time: '8:00 AM', date: '1 pill' },
        { id: 167, patientname: 'Medication A', time: '8:00 AM', date: '1 pill' },
        { id: 156, patientname: 'Medication A', time: '8:00 AM', date: '1 pill' },
        { id: 189, patientname: 'Medication A', time: '8:00 AM', date: '1 pill' },
        { id: 190, patientname: 'Medication A', time: '8:00 AM', date: '1 pill' },
        { id: 187, patientname: 'Medication A', time: '8:00 AM', date: '1 pill' },
        { id: 14578, patientname: 'Medication A', time: '8:00 AM', date: '1 pill' },
        { id: 1678, patientname: 'Medication A', time: '8:00 AM', date: '1 pill' },
        { id: 1986, patientname: 'Medication A', time: '8:00 AM', date: '1 pill' },


    ];

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="MedChronicle" onLogoutPress={handleLogout} />
            <Background style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                        {medications.map((medication) => (
                            <AppoinmentCard
                                key={medication.id}
                                appointment={medication}
                                onPress={() => handleMedicationPress(medication)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </Background>
            <PharmacistBottomBar />
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
