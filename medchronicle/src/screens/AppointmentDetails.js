import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../components/Background';
import CustomHeader from '../components/CustomHeader';
import { theme } from '../core/theme';
import { Ionicons } from '@expo/vector-icons';

const AppointmentDetails = ({ route }) => {
  const navigation = useNavigation();
  const { medication } = route.params;

  const [isCompleted, setIsCompleted] = useState(false);

  // Example function to handle navigating to the meeting screen
  const joinMeeting = () => {
    // Implement your logic to join the meeting here
    console.log('Joining the meeting...');
    // Navigate to the MeetingScreen
    navigation.navigate('MeetingScreen');
  };

  const toggleCompletion = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <>
      <CustomHeader />
      <Background>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Text style={styles.header}>Appointment Details</Text>
            <View style={styles.detailContainer}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Name:</Text>
                <Text style={styles.detailText}>{medication.patientname}</Text>
              </View>
              <View style={styles.detailLine} />
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Time:</Text>
                <Text style={styles.detailText}>{medication.time}</Text>
              </View>
              <View style={styles.detailLine} />
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Dosage:</Text>
                <Text style={styles.detailText}>{medication.dosage}</Text>
              </View>
              <View style={styles.detailLine} />
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Frequency:</Text>
                <Text style={styles.detailText}>{medication.frequency}</Text>
              </View>
              <View style={styles.detailLine} />
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailText}>{medication.date}</Text>
              </View>
              <View style={styles.detailLine} />

              {/* Checkmark icon for appointment completion */}
              <TouchableOpacity onPress={toggleCompletion} style={styles.checkboxContainer}>
                {isCompleted ? (
                  <Ionicons name="checkmark-circle" size={30} color={theme.colors.primary} style={styles.checkmarkIcon} />
                ) : (
                  <Ionicons name="ellipse-outline" size={30} color={theme.colors.primary} style={styles.checkmarkIcon} />
                )}
                <Text style={styles.checkboxLabel}>Appointment Completed</Text>
              </TouchableOpacity>

              {/* Join Meeting Button */}
              <TouchableOpacity onPress={joinMeeting} style={styles.joinMeetingButton}>
                <Text style={styles.joinMeetingText}>Create Meeting</Text>
              </TouchableOpacity>
            </View>
            {/* Add additional information here */}
          </View>
        </SafeAreaView>
      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center', // Center content horizontally
    // justifyContent: 'center', // Center content vertically
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.primary, // Assuming you have a primary color in your theme
  },
  detailContainer: {
    width: '100%',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  detailLine: {
    height: 1,
    backgroundColor: theme.colors.primary, // Assuming you have a primary color in your theme
    marginBottom: 10,
    width: '100%',
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: theme.colors.secondary, // Assuming you have a secondary color in your theme
  },
  detailText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  checkmarkIcon: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: theme.colors.text,
  },
  joinMeetingButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  joinMeetingText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AppointmentDetails;
