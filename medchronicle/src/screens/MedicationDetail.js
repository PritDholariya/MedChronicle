import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MedicationDetail = ({ route }) => {
    const { medication } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{medication.name}</Text>
            <Text>Time: {medication.time}</Text>
            <Text>Dosage: {medication.dosage}</Text>
            {/* Add additional information here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default MedicationDetail;
