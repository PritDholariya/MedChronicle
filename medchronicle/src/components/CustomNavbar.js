import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomNavbar = ({ title, onLogoutPress }) => {
    const navigation = useNavigation();
    const goBack = () => {
        navigation.navigate('DoctorDashBoard');

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} >
                <Image
                    style={styles.image}
                    source={require('../assets/arrow_back.png')}
                />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginTop: 15,
        paddingTop: 45,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 80,
        backgroundColor: '#fff', // Change background color as needed
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        marginLeft: 2,
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 24,
        height: 24,
    },
});

export default CustomNavbar;
