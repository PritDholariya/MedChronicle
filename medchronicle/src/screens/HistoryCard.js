import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Background from '../components/Background';
import CustomHeader from '../components/CustomHeader';
import MedicationCard from '../components/MedicationCard'; // Import MedicationCard component
import BottomBar from '../components/BottomBar';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryCard() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        const token = await AsyncStorage.getItem('user_id');
        console.log(token)
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
        });
    };

    const handleMedicationPress = (medication) => {
        navigation.navigate('MedicationDetails', { medication });
    };
    // Example medication data
    const medications = [
        { id: 1, name: 'Medication A', time: '8:00 AM', dosage: '1 pill' },
        { id: 2, name: 'Medication B', time: '12:00 PM', dosage: '2 pills' },
        { id: 3, name: 'Medication C', time: '6:00 PM', dosage: '1 pill' },
        { id: 4, name: 'Medication A', time: '8:00 AM', dosage: '1 pill' },
        { id: 5, name: 'Medication B', time: '12:00 PM', dosage: '2 pills' },
        { id: 36, name: 'Medication C', time: '6:00 PM', dosage: '1 pill' },
        { id: 6, name: 'Medication A', time: '8:00 AM', dosage: '1 pill' },
        { id: 7, name: 'Medication B', time: '12:00 PM', dosage: '2 pills' },
        { id: 336, name: 'Medication C', time: '6:00 PM', dosage: '1 pill' },
    ];

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="MedChronicle" onLogoutPress={handleLogout} />
            <Background style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Text style={styles.sectionTitle}>Prescription History</Text>
                        {medications.map((medication) => (
                            <MedicationCard
                                key={medication.id}
                                medication={medication}
                                onPress={() => handleMedicationPress(medication)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </Background>
            <BottomBar />
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
