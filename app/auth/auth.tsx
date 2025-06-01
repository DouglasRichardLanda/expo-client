import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomBtn from "@/components/custom/CustomBtn";
import {login_check} from "@/app/lib/login-check";

export default function AuthScreen ()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<boolean>(false)

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

    const response = await login_check(email, password)

    if (response.data) {
      await AsyncStorage.setItem('userToken', response.data.email);
      router.replace('/');
    } else {
      setError(true)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Вход в учетную запись</Text>

      <TextInput
        style={styles.input}
        placeholder="Почта"
        value={email}
        onChangeText={(text) => {
          setError(false)
          setEmail(text)
        }}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={(text) => {
          setError(false)
          setPassword(text)
        }}
        secureTextEntry
      />

      {error && <Text style={{color: "red", marginBottom: 15}}>Неправельные данные</Text>}

      <CustomBtn label={'Войти'} validating={handleSubmit} />

      <TouchableOpacity onPress={async () => {
        // const dummyToken = 'dummy_user_token_123'; // Dummy token
        // await AsyncStorage.setItem('userToken', dummyToken);
        router.replace('./register');
      }} style={styles.switchButton}>
        <Text style={styles.switchText}>
          Создать учетную запись
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

