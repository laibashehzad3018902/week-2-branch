import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({ fullName: '', email: '' });
  const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      const fullName = await AsyncStorage.getItem('fullName');
      const email = await AsyncStorage.getItem('userEmail');
      const password = await AsyncStorage.getItem('userPassword');

      if (email && password) {
        setUserInfo({ fullName, email });
      } else {
        router.push('/login');
      }
    };

    getUserInfo();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem('fullName');
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userPassword');
    router.push('/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Image */}
      <Image source={require("@/assets/images/pro.jpg")} style={styles.profileImage} />

      {userInfo.email ? (
        <>
          <Text style={styles.heading}>Welcome, {userInfo.fullName}!</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Full Name: {userInfo.fullName}</Text>
            <Text style={styles.label}>Email: {userInfo.email}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F0F8FF', // Light background color
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 30,
    borderWidth: 5,
    borderColor: '#007BFF', // Border color for profile image
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2E6EB2', // Dark blue for heading
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Shadow for floating effect
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50', // Green button for logout action
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProfileScreen;
