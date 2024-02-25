import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Text } from 'react-native';
import Background from "../components/Background";
import BottomBar from "../components/BottomBar";
import { Feather } from '@expo/vector-icons';
import DoctorCard from '../components/DoctorCard';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../../appconfig';

export default function Search() {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        fetchDataFromBackend();
    }, []);

    const fetchDataFromBackend = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/profile/alldoctors`);
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching data from backend:', error);
        }
    };

    const handleDoctorPress = (doctor) => {
        navigation.navigate('DoctorDetails', { doctor });
    };

    const filteredDoctors = doctors.filter((doctor) => {
        const name = doctor.username ? doctor.username.toLowerCase() : '';
        const specialization = doctor.doctor_profile.specialization ? doctor.doctor_profile.specialization.toLowerCase() : '';
        const searchTermLower = searchTerm.toLowerCase();
        return name.includes(searchTermLower) || specialization.includes(searchTermLower);
    });


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Feather name="search" size={24} color="black" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    value={searchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                {filteredDoctors.length > 0 ? (
                    <View style={styles.cardContainer}>
                        {filteredDoctors.map((doctor) => (
                            <TouchableOpacity key={doctor._id} onPress={() => handleDoctorPress(doctor)}>
                                <DoctorCard doctor={doctor} />
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <View style={styles.noResultsContainer}>
                        <Text style={styles.noResultsText}>No results found</Text>
                    </View>
                )}
            </ScrollView>
            <BottomBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
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
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    noResultsText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
