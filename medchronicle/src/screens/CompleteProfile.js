import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BASE_URL from '../../appconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const CompleteProfile = () => {
    const navigate = useNavigation();
    const [specialization, setSpecialization] = useState('');
    const [availability, setAvailability] = useState([{ day: '', slots: [] }]);
    const [bio, setBio] = useState('');
    const [experience, setExperience] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [counsellingFee, setCounsellingFee] = useState('');

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timings = [
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '12:00 PM - 01:00 PM',
        '01:00 PM - 02:00 PM',
        '02:00 PM - 03:00 PM',
        '03:00 PM - 04:00 PM',
        '04:00 PM - 05:00 PM',
        '05:00 PM - 06:00 PM',
    ];

    const handleAddSlot = () => {
        const lastSlot = availability[availability.length - 1];
        if (lastSlot.day !== '') {
            setAvailability([...availability, { day: '', slots: [] }]);
        } else {
            const updatedAvailability = [...availability];
            updatedAvailability[availability.length - 1].day = days[0]; // Default to Monday
            setAvailability(updatedAvailability);
        }
    };

    const handleSaveProfile = async () => {
        console.log('Profile saved!');
        console.log(bio + experience + phoneNo + counsellingFee);
        console.log(specialization);
        console.log(availability);
        const token = await AsyncStorage.getItem('user_id');
        console.log(token)
        try {
            const response = await axios.post(`${BASE_URL}/profile/updatedoctor`, {
                id: token,
                specialization,
                availability,
                Bio: bio,
                Experiance: experience,
                Phone_no: phoneNo,
                Counselling_fee: counsellingFee

            }).then(async (response) => {

                console.log(response.data)

                navigate.reset({
                    index: 0,
                    routes: [{ name: 'DoctorProfile' }],
                })
            });
        }
        catch (error) {
            console.log("login failed: ", error)

        }
    };

    const handleDaySelect = (index, selectedDay) => {
        const updatedAvailability = [...availability];
        updatedAvailability[index].day = selectedDay;
        setAvailability(updatedAvailability);
    };

    const handleSlotSelect = (index, time) => {
        const updatedAvailability = [...availability];
        const selectedSlots = updatedAvailability[index].slots;
        if (selectedSlots.includes(time)) {
            updatedAvailability[index].slots = selectedSlots.filter(slot => slot !== time);
        } else {
            updatedAvailability[index].slots = [...selectedSlots, time];
        }
        setAvailability(updatedAvailability);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TextInput
                    style={styles.input}
                    value={specialization}
                    onChangeText={text => setSpecialization(text)}
                    placeholder="Specialization"
                />
                {availability.map((day, index) => (
                    <View key={index}>
                        <Text style={styles.label}>Select day for the slots</Text>
                        <Picker
                            selectedValue={day.day}
                            onValueChange={value => handleDaySelect(index, value)}
                        >
                            <Picker.Item label="Select day" value="" />
                            {days.map(day => (
                                <Picker.Item key={day} label={day} value={day} />
                            ))}
                        </Picker>
                        <Text style={styles.label}>Select timing for {day.day}</Text>
                        <View style={styles.radioContainer}>
                            {timings.map(time => (
                                <TouchableOpacity
                                    key={time}
                                    style={[
                                        styles.radio,
                                        day.slots.includes(time) && styles.radioSelected,
                                    ]}
                                    onPress={() => handleSlotSelect(index, time)}
                                >
                                    <Text style={styles.radioText}>{time}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
                <Button title="Add Slot" onPress={handleAddSlot} />
                <TextInput
                    style={styles.input}
                    value={bio}
                    onChangeText={text => setBio(text)}
                    placeholder="Bio"
                    multiline
                />
                <TextInput
                    style={styles.input}
                    value={experience}
                    onChangeText={text => setExperience(text)}
                    placeholder="Experience"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={phoneNo}
                    onChangeText={text => setPhoneNo(text)}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    value={counsellingFee}
                    onChangeText={text => setCounsellingFee(text)}
                    placeholder="Counselling Fee"
                    keyboardType="numeric"
                />
                <View style={styles.buttonContainer}>
                    <Button title="Save Profile" onPress={handleSaveProfile} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    radioContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    radio: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5,
    },
    radioSelected: {
        backgroundColor: 'lightblue',
    },
    radioText: {
        color: 'black',
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
});

export default CompleteProfile;
