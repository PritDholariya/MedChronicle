import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Background from "../components/Background";
import CustomHeader from "../components/CustomHeader";
import MedicationCard from "../components/MedicationCard"; // Import MedicationCard component
import BottomBar from "../components/BottomBar";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BASE_URL from "../../appconfig";
import { useEffect, useState } from "react";
// import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();
  const [medication, setmedication] = useState([]);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "StartScreen" }],
    });
  };

  const handleMedicationPress = (medication) => {
    navigation.navigate("MedicationDetails", { medication });
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = async () => {
    // Dummy user data for testing
    // const dummyUser = {
    //     username: 'John Doe',
    //     email: 'john@example.com',
    //     profile_photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU',
    //     qr_code: 'john@example.com', // Dummy QR code for testing
    //     dob: "dd/mm/year"
    // };

    const token = await AsyncStorage.getItem("user_id");
    console.log(token);
    try {
      const response = await axios
        .post(`${BASE_URL}/prescription/activemedication`, {
          patientid: token,
        })
        .then(async (response) => {
          console.log(response.data);
          setmedication(response.data.medication);
          // navigate.reset({
          //     index: 0,
          //     routes: [{ name: 'DoctorProfile' }],
          // })
          // response.data.user.dob = response.data.user.dob.toLocaleDateString();
        });
    } catch (error) {
      console.log("details not fetched: ", error);
    }
  };

  // Example medication data
  const medications = [
    { id: 1, name: "Medication A", time: "8:00 AM", dosage: "1 pill" },
    { id: 2, name: "Medication B", time: "12:00 PM", dosage: "2 pills" },
    { id: 3, name: "Medication C", time: "6:00 PM", dosage: "1 pill" },
    { id: 4, name: "Medication A", time: "8:00 AM", dosage: "1 pill" },
    { id: 5, name: "Medication B", time: "12:00 PM", dosage: "2 pills" },
    { id: 36, name: "Medication C", time: "6:00 PM", dosage: "1 pill" },
    { id: 6, name: "Medication A", time: "8:00 AM", dosage: "1 pill" },
    { id: 7, name: "Medication B", time: "12:00 PM", dosage: "2 pills" },
    { id: 336, name: "Medication C", time: "6:00 PM", dosage: "1 pill" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="MedChronicle" onLogoutPress={handleLogout} />
      <Background style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Active Medication</Text>
            {medication ? (
              medication.map((medicationData, index) => (
                <View key={index}>
                  {/* <Text>Prescription {index + 1}</Text> */}
                  <MedicationCard
                    key={index}
                    medication={medicationData}
                    // onPress={() => handleMedicationPress(medicationData)}
                  />
                </View>
              ))
              
            ) : (
              <Text>Loading medication data...</Text>
            )}
          </View>
        </ScrollView>
      </Background>
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    // paddingTop: 20,
  },
  scrollView: {
    // flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
