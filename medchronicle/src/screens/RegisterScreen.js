import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from 'axios';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';
import BASE_URL from '../../appconfig';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedType, setSelectedType] = useState('patient');

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    console.log(dateOfBirth);
    console.log(name.value);
    console.log(email.value);
    console.log(password.value);
    console.log(selectedType);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        username: name.value,
        email: email.value,
        password: password.value,
        dob: dateOfBirth,
        type: selectedType,
      });

      console.log("Signin Successful", response.data);
    } catch (error) {
      console.log("signUp failed: ", error);
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
    //   if (selectedType === 'patient') {
    //     navigation.reset({
    //       index: 0,
    //       routes: [{ name: 'Dashboard' }],
    //     });
    //   } else if(selectedType === 'doctor'){
    //     // Redirect to the default dashboard or another screen for other types
    //     navigation.reset({
    //       index: 0,
    //       routes: [{ name: 'DoctorDashBoard' }],
    //     });
    //   }
    //   else{
    //     navigation.reset({
    //       index: 0,
    //       routes: [{ name: 'PharmacistDashBoard' }],
    //     });
    //   }
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatepicker();
    }
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>

      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={[styles.radioButton, selectedType === 'patient' && styles.selectedRadioButton]}
          onPress={() => handleTypeChange('patient')}
        >
          <Text style={[styles.radioText, selectedType === 'patient' && styles.selectedRadioText]}>Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.radioButton, selectedType === 'doctor' && styles.selectedRadioButton]}
          onPress={() => handleTypeChange('doctor')}
        >
          <Text style={[styles.radioText, selectedType === 'doctor' && styles.selectedRadioText]}>Doctor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.radioButton, selectedType === 'pharmacist' && styles.selectedRadioButton]}
          onPress={() => handleTypeChange('pharmacist')}
        >
          <Text style={[styles.radioText, selectedType === 'pharmacist' && styles.selectedRadioText]}>Pharmacist</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View>
        <Text style={styles.label}>Date of Birth : </Text>

        {showPicker && (
          <DateTimePicker
            mode='date'
            display='spinner'
            value={date}
            onChange={onChange}
          />
        )}

        {!showPicker && (
          <Pressable
            onPress={toggleDatepicker}
          >
            <TextInput
              style={styles.input}
              placeholder="Sat Aug 21 2004"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholderTextColor="#11182744"
              editable={false}
            />
          </Pressable>
        )}
      </View>

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 10,
    color: "#111827cc",
  },
  input: {
    backgroundColor: "transparent",
    height: 50,
    fontSize: 14,
    fontWeight: "500",
    color: "111827cc",
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: "#11182711",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  radioButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    margin: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedRadioButton: {
    borderColor: 'blue',
    backgroundColor: 'lightblue',
  },
  radioText: {
    fontSize: 16,
  },
  selectedRadioText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
