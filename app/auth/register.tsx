import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


const RegisterScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)


  const IP: string = Constants.expoConfig?.extra?.IP;

  const validating = async () => {
    if (!isValidEmail(email)) {
      setError(true)
    } else {
      const response = await fetch(`http://${IP}:5000/register/first`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email})
      })
      const {success} = await response.json();
      return success === true ? router.replace("./verify") : null;
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.header}>{'Регистрация'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Почта"
        value={email}
        onChangeText={(text) => {
          setEmail(text)
          setError(false)
        }}
        keyboardType="email-address"
      />

      {error && <Text style={{color: "red", marginBottom: 10}}>Введите правильные данные</Text>}

      <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 1, marginBottom: 15 }} onPress={validating}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Продолжить регистрацию</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 1 }} onPress={() => {
        router.replace("/auth/auth")
      }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Вернуться к входу</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 50,
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

export default RegisterScreen;
