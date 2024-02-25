import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Background from '../components/Background';
// import { getUserById } from '../api/user'; // Function to fetch user data from API
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import DoctorBottomBar from '../components/DoctorBottomBar';

const DoctorProfile = () => {
    const navigation = useNavigation();

    const [user, setUser] = useState(null);
    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
        });
    };
    const handleCompleteProfile = () => {
        navigation.navigate('CompleteProfile'); // Navigate to CompleteProfile page
    };
    useEffect(() => {
        // Fetch user data when the component mounts
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        // Dummy user data for testing
        const dummyUser = {
            username: 'John Doe',
            email: 'john@example.com',
            profile_photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU',
            qr_code: 'john@example.com', // Dummy QR code for testing
            dob: "dd/mm/year"
        };

        // Update state with the dummy user data
        setUser(dummyUser);
    };

    return (
        <>
            <CustomHeader title="MedChronicle" onLogoutPress={handleLogout} />
            <View style={styles.container} >

                <Background style={styles.background}>
                    {user && (
                        <View style={styles.contentContainer}>
                            <Image
                                source={{ uri: user.profile_photo }}
                                style={styles.profilePhoto}
                            />
                            <Text style={styles.username}>{user.username}</Text>
                            <Text style={styles.email}>{user.email}</Text>
                            <Text style={styles.dob}>{user.dob}</Text>
                            <TouchableOpacity onPress={handleCompleteProfile} style={styles.completeProfileButton}>
                                <Text style={styles.completeProfileButtonText}>Complete Profile</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Background>
                <DoctorBottomBar />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    background: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    contentContainer: {
        alignItems: 'center',
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        marginBottom: 10,
    },
    dob: {
        fontSize: 16,
        marginBottom: 20,
    },
    completeProfileButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    completeProfileButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DoctorProfile;
