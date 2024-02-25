import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DoctorBottomBar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('DoctorDashBoard')}>
                <AntDesign name="home" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Search')}>
                <AntDesign name="camera" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Histor')}>
                <AntDesign name="clockcircleo" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('UserProfile')}>
                <AntDesign name="profile" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
});

export default DoctorBottomBar;
