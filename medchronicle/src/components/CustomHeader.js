import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = ({ title, onLogoutPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onLogoutPress}>
                <Ionicons name="log-out" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginTop: 15,
        paddingTop: 45,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 80,
        backgroundColor: '#fff', // Change background color as needed
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CustomHeader;
