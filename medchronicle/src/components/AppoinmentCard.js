import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const AppoinmentCard = ({ appointment, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.card, { width: windowWidth - 40 }]}>
                {/* <Text style={styles.medicationName}>{appointment.patientname}</Text> */}
                <Text>Date: {appointment.Date_of_Appointment}</Text>
                <Text>Time: {appointment.slot}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default AppoinmentCard;
