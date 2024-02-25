import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const MedicationCard = ({ medication}) => {
    return (
        // <TouchableOpacity onPress={onPress}>
            <View style={[styles.card, { width: windowWidth - 40 }]}>
                <Text style={styles.medicationName}>{medication.name}</Text>
                <Text>Dosage: {medication.dosage}</Text>
                <Text>Times:</Text>
                {medication.times.map((time, index) => (
                    <Text key={index}>{time}</Text>
                ))}
            </View>
        // </TouchableOpacity>
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

export default MedicationCard;
