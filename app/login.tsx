import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email.trim());
  };

  // Check if the user is already logged in
  useEffect(() => {
    const checkLogin = async () => {
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userPassword = await AsyncStorage.getItem('userPassword');
      
      if (userEmail && userPassword) {
        // If the user is already logged in, navigate to the profile screen
        router.push('/profilescreen');
      }
    };
    checkLogin();
  }, []);

  // Handle login submission
  const handleLogin = async () => {
    setErrorMessage('');
  
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
  
    try {
      // Fetch data from AsyncStorage
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');
  
      // Log the fetched data for debugging
      console.log('Stored Email from AsyncStorage:', storedEmail);
      console.log('Stored Password from AsyncStorage:', storedPassword);
      console.log('Input Email:', email);
      console.log('Input Password:', password);
  
      // Validate login credentials
      if (storedEmail === email && storedPassword === password) {
        Alert.alert('Login successful', '', [
          {
            text: 'OK',
            onPress: () => router.replace('/profilescreen'), // Redirect to profile
          },
        ]);
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image at the top */}
      <Image source={require("@/assets/images/loginn.png")} style={styles.logo} />
      
      <Text style={styles.heading}>Login</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>

      {/* Error Message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign-Up Link */}
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E6F7FF', // Light background for a fresh look
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 15, // Soft rounded corners for the image
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2E6EB2', // A deep blue for the heading
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  inputContainer: {
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Elevated input fields with shadow
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B8D8E1', // Light blue border for inputs
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#F7FBFF', // Slightly lighter background for inputs
  },
  errorText: {
    color: '#FF4D4D', // Red color for error message
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Fresh green button for the login
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
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
  signupText: {
    color: '#191970', // Matching the button color for consistency
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});

export default Login;
