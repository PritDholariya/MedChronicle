import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import CustomNavbar from '../components/CustomNavbar';

const UserDetails = ({ route }) => {
    const [activeOption, setActiveOption] = useState('UserData');
    const { scannedData } = route.params;
    console.log("user" + scannedData);
    const handleOptionPress = (option) => {
        setActiveOption(option);
    };

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <CustomNavbar title="MedChronicle" onLogoutPress={handleLogout} />
            {/* App Bar with User Data and Medical History Options */}
            <View style={styles.appBar}>
                <TouchableOpacity
                    style={[styles.optionButton, activeOption === 'UserData' && styles.activeOption]}
                    onPress={() => handleOptionPress('UserData')}
                >
                    <Text style={[styles.optionText, activeOption === 'UserData' && styles.activeOptionText]}>
                        User Data
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.optionButton, activeOption === 'MedicalHistory' && styles.activeOption]}
                    onPress={() => handleOptionPress('MedicalHistory')}
                >
                    <Text style={[styles.optionText, activeOption === 'MedicalHistory' && styles.activeOptionText]}>
                        Medical History
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                {/* Render User Data or Medical History based on activeOption */}
                {activeOption === 'UserData' ? (
                    <View>
                        {/* User Data Section */}
                        <Text>User Data Section</Text>
                    </View>
                ) : (
                    <View>
                        {/* Medical History Section */}
                        <Text>Medical History Section</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',

    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionButton: {
        paddingVertical: 8,
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    activeOption: {
        borderBottomWidth: 2,
        borderBottomColor: '#007bff', // Change color based on your design
    },
    activeOptionText: {
        color: '#007bff', // Change color based on your design
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UserDetails;
