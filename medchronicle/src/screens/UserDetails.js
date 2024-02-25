import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import CustomNavbar from "../components/CustomNavbar";
import Background from "../components/Background";
import MedicationCard from "../components/MedicationCard";
import axios from "axios";
import BASE_URL from "../../appconfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const UserDetails = ({ route }) => {
  const [activeOption, setActiveOption] = useState("UserData");
  const [user, setUser] = useState("");
  const [medication, setmedication] = useState([]);

  const [prescription, setPrescription] = useState({
    medications: [
      {
        name: "",
        dosage: "",
        times: [],
      },
    ],
    instructions: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const { scannedData } = route.params;

  const handleOptionPress = (option) => {
    setActiveOption(option);
  };

  const handleAddPrescription = () => {
    setPrescription({
      medications: [
        {
          name: "",
          dosage: "",
          times: [],
        },
      ],
      instructions: "",
    });
    setModalVisible(true);
  };

  const handleMedicationNameChange = (text, index) => {
    setPrescription((prevPrescription) => {
      const medications = [...prevPrescription.medications];
      medications[index].name = text;
      return { ...prevPrescription, medications };
    });
  };

  const handleDosageChange = (text, index) => {
    setPrescription((prevPrescription) => {
      const medications = [...prevPrescription.medications];
      medications[index].dosage = text;
      return { ...prevPrescription, medications };
    });
  };

  const handleTimesChange = (text, index) => {
    setPrescription((prevPrescription) => {
      const medications = [...prevPrescription.medications];
      medications[index].times = text.split(",").map((time) => time.trim());
      return { ...prevPrescription, medications };
    });
  };

  const handleAddMedication = () => {
    setPrescription((prevPrescription) => ({
      ...prevPrescription,
      medications: [
        ...prevPrescription.medications,
        {
          name: "",
          dosage: "",
          times: [],
        },
      ],
    }));
  };

  const handleSavePrescription = async () => {
    const token = await AsyncStorage.getItem('user_id');
    console.log("Prescription saved:", prescription);
    try {
      const response = await axios.post(`${BASE_URL}/prescription/add`, {
        prescription: prescription,
        userid: user._id,
        doctorid: token,

      });
    } catch (error) {
      console.log("details not fetched: ", error);
    }
    setModalVisible(false);
  };

  useEffect(() => {
    fetchUserData();
    fetchUserData1();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
      fetchUserData1();
    }, [])
  );

  const fetchUserData1 = async () => {
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
  const fetchUserData = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/profile/user`, {
        id: scannedData,
      });
      setUser(response.data.user);
    } catch (error) {
      console.log("details not fetched: ", error);
    }
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "StartScreen" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomNavbar title="MedChronicle" onLogoutPress={handleLogout} />
      <View style={styles.appBar}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            activeOption === "UserData" && styles.activeOption,
          ]}
          onPress={() => handleOptionPress("UserData")}
        >
          <Text
            style={[
              styles.optionText,
              activeOption === "UserData" && styles.activeOptionText,
            ]}
          >
            User Data
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            activeOption === "MedicalHistory" && styles.activeOption,
          ]}
          onPress={() => handleOptionPress("MedicalHistory")}
        >
          <Text
            style={[
              styles.optionText,
              activeOption === "MedicalHistory" && styles.activeOptionText,
            ]}
          >
            Medical History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.content}>
          {activeOption === "UserData" ? (
            <View style={styles.container}>
              <Background style={styles.background}>
                {user && (
                  <View style={styles.contentContainer}>
                    <Image
                      source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU",
                      }}
                      style={styles.profilePhoto}
                    />
                    <Text style={styles.username}>{user.username}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                    <Text style={styles.dob}>{user.dob}</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={handleAddPrescription}
                >
                  <Text style={styles.optionText}>Add Prescription</Text>
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      {prescription.medications.map((medication, index) => (
                        <View key={index}>
                          <TextInput
                            style={styles.prescriptionInput}
                            placeholder="Medication Name"
                            value={medication.name}
                            onChangeText={(text) =>
                              handleMedicationNameChange(text, index)
                            }
                          />
                          <TextInput
                            style={styles.prescriptionInput}
                            placeholder="Dosage"
                            value={medication.dosage}
                            onChangeText={(text) =>
                              handleDosageChange(text, index)
                            }
                          />
                          <TextInput
                            style={styles.prescriptionInput}
                            placeholder="Times (comma-separated)"
                            value={medication.times.join(", ")}
                            onChangeText={(text) =>
                              handleTimesChange(text, index)
                            }
                          />
                        </View>
                      ))}
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddMedication}
                      >
                        <Text style={styles.addButtonText}>
                          Add More
                        </Text>
                      </TouchableOpacity>

                      <TextInput
                        style={styles.prescriptionInput}
                        placeholder="Instructions"
                        value={prescription.instructions}
                        onChangeText={(text) =>
                          setPrescription((prevPrescription) => ({
                            ...prevPrescription,
                            instructions: text,
                          }))
                        }
                        multiline
                      />

                      <View style={styles.modalButtonsContainer}>
                        <TouchableOpacity
                          style={styles.saveButton}
                          onPress={handleSavePrescription}
                        >
                          <Text style={styles.saveButtonText}>
                            Save Prescription
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={() => setModalVisible(false)}
                        >
                          <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </Background>
            </View>
          ) : (
            <View>
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
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionButton: {
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  activeOption: {
    borderBottomWidth: 2,
    borderBottomColor: "#007bff",
  },
  activeOptionText: {
    color: "#007bff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  dob: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
  },
  prescriptionInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    width: "48%",
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "48%",
  },
  closeButtonText: {
    color: "#333",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default UserDetails;
