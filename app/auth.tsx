import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        console.log(userToken)
        // router.replace('/personal'); // Redirect if already logged in
      } else {
        console.log("No token")
      }
    };
    checkLogin();
  }, []);

  const handleSubmit = async () => {
    if (isLogin) {
      console.log('Logging in with', email, password);
      await AsyncStorage.setItem('userToken', 'dummy_token');
      router.replace('/');
    } else {
      console.log('Registering with', email, password);
      // Handle registration logic here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isLogin ? 'Login' : 'Register'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title={isLogin ? 'Login' : 'Register'} onPress={handleSubmit} />

      <TouchableOpacity onPress={async () => {
        const dummyToken = 'dummy_user_token_123'; // Dummy token
        await AsyncStorage.setItem('userToken', dummyToken);
        router.replace('/register');
        // setIsLogin(!isLogin)
      }} style={styles.switchButton}>
        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#007BFF',
    textAlign: 'center',
  },
});

export default AuthScreen;
