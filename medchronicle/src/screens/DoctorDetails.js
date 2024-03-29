import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';

const DoctorDetails = ({ route }) => {
    const { doctor } = route.params;
    const navigation = useNavigation();

    const handleAppointment = () => {
        // Navigate to the appointment form screen and pass the doctor's data
        navigation.navigate('AppointmentForm', { doctor });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar title="MedChronicle" />
            <Image source={{ uri: 'data:image/png;base64,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' }} style={styles.photo} />
            <Text style={styles.name}>{doctor.username}</Text>
            <Text style={styles.specialization}>{doctor.doctor_profile.specialization}</Text>
            <Text style={styles.bio}>{doctor.doctor_profile.Bio}</Text>
            <Text style={styles.experience}>Experience: {doctor.doctor_profile.Experiance} years</Text>
            <Text style={styles.phone}>Phone: {doctor.doctor_profile.Phone_no}</Text>
            <Text style={styles.fee}>Counseling Fee: {doctor.doctor_profile.Counselling_fee}</Text>
            <TouchableOpacity style={styles.button} onPress={handleAppointment}>
                <Text style={styles.buttonText}>Add Appointment</Text>
            </TouchableOpacity>
            <View style={styles.availabilityContainer}>
                <Text style={styles.availabilityHeading}>Availability:</Text>
                {doctor.doctor_profile.availability.map((dayAvailability, index) => (
                    <View key={index}>
                        <Text style={styles.day}>{dayAvailability.day}</Text>
                        <View style={styles.slotsContainer}>
                            {dayAvailability.slots.map((slot, idx) => (
                                <Text key={idx} style={styles.slot}>{slot.time}</Text>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    photo: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    specialization: {
        fontSize: 18,
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        marginBottom: 10,
    },
    experience: {
        fontSize: 16,
        marginBottom: 10,
    },
    phone: {
        fontSize: 16,
        marginBottom: 10,
    },
    fee: {
        fontSize: 16,
        marginBottom: 10,
    },
    availabilityContainer: {
        marginTop: 20,
    },
    availabilityHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    day: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    slotsContainer: {
        marginLeft: 20,
    },
    slot: {
        fontSize: 14,
        marginBottom: 5,
    },
    button: {
        marginTop: 0,
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default DoctorDetails;
