import React from 'react';
import { View, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Background from "../components/Background";
import BottomBar from "../components/BottomBar";
import { Feather } from '@expo/vector-icons';
import DoctorCard from '../components/DoctorCard'; // Import DoctorCard component
import { useNavigation } from '@react-navigation/native';


export default function Search() {
    const navigation = useNavigation();
    // Example doctor data
    const doctors = [
        { id: 1, name: 'Dr. John Doe', specialization: 'Cardiologist', pic: 'https://example.com/doctor1.jpg' },
        { id: 2, name: 'Dr. Jane Smith', specialization: 'Dermatologist', pic: 'https://example.com/doctor2.jpg' },
        { id: 3, name: 'Dr. John Doe', specialization: 'Cardiologist', pic: 'https://example.com/doctor1.jpg' },
        { id: 23, name: 'Dr. Jane Smith', specialization: 'Dermatologist', pic: 'https://example.com/doctor2.jpg' },
        { id: 12, name: 'Dr. John Doe', specialization: 'Cardiologist', pic: 'https://example.com/doctor1.jpg' },
        { id: 24, name: 'Dr. Jane Smith', specialization: 'Dermatologist', pic: 'https://example.com/doctor2.jpg' },
        { id: 1686, name: 'Dr. John Doe', specialization: 'Cardiologist', pic: 'https://example.com/doctor1.jpg' },
        { id: 2499, name: 'Dr. Jane Smith', specialization: 'Dermatologist', pic: 'https://example.com/doctor2.jpg' },
        { id: 190, name: 'Dr. John Doe', specialization: 'Cardiologist', pic: 'https://example.com/doctor1.jpg' },
        { id: 2578, name: 'Dr. Jane Smith', specialization: 'Dermatologist', pic: 'https://example.com/doctor2.jpg' },
        // Add more doctor data as needed
    ];

    const handleDoctorPress = (doctor) => {
        // Navigate to doctor detail screen or perform other actions
        navigation.navigate('DoctorDetails', { doctor });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <Background style={styles.background}> */}
            <View style={styles.searchContainer}>
                <Feather name="search" size={24} color="black" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Display doctor cards */}
                <View style={styles.cardContainer}>
                    {doctors.map((doctor) => (
                        <TouchableOpacity key={doctor.id} onPress={() => handleDoctorPress(doctor)}>
                            <DoctorCard doctor={doctor} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            {/* </Background> */}
            <BottomBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    cardContainer: {
        paddingHorizontal: 20,
    },
});
