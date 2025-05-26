import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


const RegisterScreen = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const validating = () => {
    if (!isValidEmail(email) || name.length < 5) {
      setError(true)
    } else {
      router.replace("/subscription")
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.header}>{'Регистрация'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Имя Фамилия"
        value={name}
        onChangeText={(text) => {
          setName(text)
          setError(false)
        }}
        keyboardType="ascii-capable"
      />

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

      <TouchableOpacity
        onPress={() => {
          router.replace("/auth")
        }}
        style={{
          position: 'absolute',
          bottom: 40,
          right: 20,
          backgroundColor: '#007BFF',
          borderRadius: 50,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 10 }}>Login</Text>
      </TouchableOpacity>

      <Button title={"Продолжить"} onPress={validating} />
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
