import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.header}>{'Register'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Имя Фамилия"
        value={""}
        onChangeText={() => {}}
        keyboardType="ascii-capable"
      />

      <TextInput
        style={styles.input}
        placeholder="Имя отца в иминительном падеже"
        value={""}
        onChangeText={() => {}}
        keyboardType="ascii-capable"
      />

      <TextInput
        style={styles.input}
        placeholder="Дата рождения в виде: 10.10.1995"
        value={""}
        onChangeText={() => {}}
        keyboardType="numeric"
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        placeholder="Почта"
        value={""}
        onChangeText={() => {}}
        keyboardType="email-address"
        maxLength={10}
      />

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

      <Button title={"Submit"} onPress={() => {
        router.replace("/subscription")
      }} />
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
