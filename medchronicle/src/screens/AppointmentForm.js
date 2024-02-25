import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../../appconfig';

const AppointmentForm = ({ route }) => {
    const navigation = useNavigation();
    const { doctor } = route.params;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false); // State to control visibility of DateTimePicker

    const slotsObj = {};
    doctor.doctor_profile.availability.forEach(({ day, slots }) => {
        slotsObj[day] = slots.map(({ time }) => time);
    });

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setSelectedDate(date);
            const selectedDayIndex = date.getDay();
            setSelectedDay(daysOfWeek[selectedDayIndex]);
            setSelectedSlot('');
            setShowDatePicker(false); // Hide DateTimePicker after date selection
        }
    };

    const handleSlotChange = (slot) => {
        setSelectedSlot(slot);
    };

    const handleSubmit = async () => {
        // Send selectedDay and selectedSlot to backend API
        const token = await AsyncStorage.getItem('user_id');

        console.log('Selected Date:', selectedDate);
        console.log('Selected Day:', selectedDay);
        console.log('Selected Slot:', selectedSlot);
        try {
            const response = await axios.post(`${BASE_URL}/doctor/appointments`, {
                Doctor_id: doctor._id,
                Patient_id: token,
                slot: selectedSlot,
                Date_of_Appointment: selectedDate,
                Day: selectedDay,
            });

            console.log("Signin Successful", response.data);
            navigation.navigate('Dashboard')
        } catch (error) {
            console.log("signUp failed: ", error);
        }
        // You can make a fetch call here to send the data to your backend API
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Appointment Form</Text>
            <View style={styles.pickerContainer}>
                <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
            </View>

            {selectedDay !== '' && (
                <View style={styles.pickerContainer}>
                    {slotsObj[selectedDay] && slotsObj[selectedDay].length > 0 ? (
                        <Picker
                            selectedValue={selectedSlot}
                            style={styles.picker}
                            onValueChange={(itemValue) => handleSlotChange(itemValue)}
                        >
                            <Picker.Item label="Select a time slot" value="" />
                            {slotsObj[selectedDay].map((slot) => (
                                <Picker.Item key={slot} label={slot} value={slot} />
                            ))}
                        </Picker>
                    ) : (
                        <Text style={styles.noSlotsText}>No slots available for selected day</Text>
                    )}
                </View>
            )}

            <Button title="Submit" onPress={handleSubmit} disabled={!selectedSlot} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    pickerContainer: {
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
    },
    noSlotsText: {
        fontSize: 16,
        color: 'red',
    },
});

export default AppointmentForm;
