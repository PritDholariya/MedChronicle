import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Background from "../components/Background";
import BottomBar from "../components/BottomBar";
import { Feather } from '@expo/vector-icons';
import DoctorCard from '../components/DoctorCard'; // Import DoctorCard component
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../../appconfig';

export default function Search() {
    const [doctors, setDoctors] = useState([]);
    const navigation = useNavigation();
   
    useEffect(() => {
        // Fetch data from your backend API
        fetchDataFromBackend();
    }, []);


    const fetchDataFromBackend = async () => {
        try {
            // Replace 'YOUR_BACKEND_API_ENDPOINT' with your actual backend API endpoint
            const response = await axios.get(`${BASE_URL}/profile/alldoctors`);
            setDoctors(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching data from backend:', error);
        }
    };
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
                        <TouchableOpacity key={doctor._id} onPress={() => handleDoctorPress(doctor)}>
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
