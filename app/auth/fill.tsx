import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
import DateWheelPicker from "@/components/custom/DateWheel";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


const RegisterScreen = () => {
  const router = useRouter();

  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);


  const { email } = useLocalSearchParams();

  const [name, setName] = useState<string>("")
  const [father, setFather] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordR, setPasswordR] = useState<string>("")
  const [birthday, setBirthday] = useState<Date>(new Date())

  const [error, setError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [nameError, setNameError] = useState<boolean>(false)
  const [passwordFormatError, setPasswordFormatError] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)

  const [selectedNumber, setSelectedNumber] = useState(1);

  const IP: string = Constants.expoConfig?.extra?.IP;

  const submitData = async () => {
    try {
      if (password !== passwordR) {
        setPasswordError(true)
        return
      }

      if (name.length < 5 || father.length < 1) {
        setNameError(true)
        return
      }

      if (password.length < 6) {
        setPasswordFormatError(true)
        return
      }

      const response = await fetch(`http://${IP}:5000/register/third`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, father, password, birthday, email: email})
      })

      await AsyncStorage.setItem('userToken', 'dummy_token');
      router.replace('/');
    } catch (e) {
      console.error(e)
    }
  }

  const onChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) setBirthday(selectedDate);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>{'Заполнение учетной записи'}</Text>

      <TextInput
        style={[styles.input, nameError && styles.error]}
        placeholder="Имя Фамилия"
        value={name}
        onChangeText={(text) => {
          setName(text)
          setNameError(false)
          setError(false)
        }}
        keyboardType="email-address"
      />

      <Text style={{fontWeight: 800, marginBottom: 10, color: 'gray'}}>Имя отца указывается в иминительном падеже (Игорь, Павел)</Text>

      <TextInput
        style={[styles.input, nameError && styles.error]}
        placeholder="Имя отца"
        value={father}
        onChangeText={(text) => {
          setFather(text)
          setNameError(false)
          setError(false)
        }}
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, passwordError && styles.error || passwordFormatError && styles.error]}
        placeholder="Пароль"
        value={password}
        onChangeText={(text) => {
          setPassword(text)
          setPasswordError(false)
          setPasswordFormatError(false)
        }}
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, passwordError && styles.error || passwordFormatError && styles.error]}
        placeholder="Повторите пароль"
        value={passwordR}
        onChangeText={(text) => {
          setPasswordR(text)
          setPasswordError(false)
          setPasswordFormatError(false)
        }}
        keyboardType="email-address"
      />

      {passwordError && <Text style={[styles.error,{marginBottom: 15}]}>Пароли не сходятся</Text>}
      {passwordFormatError && <Text style={[styles.error,{marginBottom: 15}]}>Пароль должен быть минимум 6 символов</Text>}

      <Text>Дата рождения: {`${birthday.getMonth()} - ${birthday.getDate()} - ${birthday.getFullYear()}`}</Text>

      {/*{show && <DateTimePicker*/}
      {/*  value={birthday}*/}
      {/*  mode="date"*/}
      {/*  display="default"*/}
      {/*  onChange={onChange}*/}
      {/*/>}*/}

      {/*<Button title="Выбери Дату" onPress={() => setShow(true)} />*/}

      <DateWheelPicker day={day} setDay={setDay} month={month} setMonth={setMonth} year={year} setYear={setYear} />

      {error && <Text style={{color: "red", marginBottom: 10}}>Введите правильные данные</Text>}


      <Button title={"Продолжить"} onPress={submitData} />
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
  error: {
    color: "red",
    borderColor: "red"
  }
});

export default RegisterScreen;
