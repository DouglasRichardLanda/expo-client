import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator, TextInput} from 'react-native';
import {fetch_user_data} from "@/app/lib/fetch-user-data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";
import CustomBtnLight from "@/components/custom/CustomBtnLight";
import CustomBtn from "@/components/custom/CustomBtn";
import {change_user_name} from "@/app/lib/change-user-name";

export default function ProfileScreen() {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingBTN, setLoadingBTN] = useState<boolean>(false)
  const [userData, setUserData] = useState<null | any>(null)
  const [changeName, setChangeName] = useState<boolean>(false)
  const [newName, setNewName] = useState<string | null>(null)
  const [newFather, setNewFather] = useState<string | null>(null)
  const [nameError, setNameError] = useState<boolean>(false)
  const [birthday, setBirthday] = useState<Date | null>(null)

  useEffect(() => {
    const fetching_data = async () => {
      const email = await AsyncStorage.getItem('userToken');

      if (typeof email === 'string') {
        fetch_user_data(email).then((data) => {
          if (data.success) {
            setUserData(data.data)
            const local_date = new Date(data.data.birthday);
            setBirthday(local_date)
            setNewName(data.data.name)
            setNewFather(data.data.fathername)
            setLoading(false)
          }
        })
      } else {
        router.replace("/auth/auth")
      }
    }
    fetching_data()
  }, []);

  const change_name = async () => {
    if (!newName || newName?.length < 2 || !newFather || newFather?.length < 2) {
      setNameError(true)
      return
    }
    setLoadingBTN(true)
    await change_user_name(newName, newFather)
  }


  return (
    <View style={styles.container}>
      {/* User Details */}
      {loading &&
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      }
      {!loading && birthday !== null && <View>

        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.info}>Имя отца: {userData.fathername}</Text>
        <Text style={styles.info}>{userData.email}</Text>
        <Text style={styles.info}>{birthday.getFullYear()} - {birthday.getMonth() + 1} - {birthday.getDate()}</Text>
        <Text style={styles.info}>Счастливое число рождения - <Text style={{fontWeight: 800, color: "black"}}>{userData.lbnumber}</Text></Text>
        <Text style={styles.info}>Счастливое число имени - <Text style={{fontWeight: 800, color: "black"}}>{userData.lnnumber}</Text></Text>
        <Text style={styles.info}>Счастливое число - <Text style={{fontWeight: 800, color: "black"}}>{userData.lnumber}</Text></Text>
        {/*<Text style={[styles.package, user.packageType === 'Premium' ? styles.premium : styles.standard]}>*/}
        {/*  {user.packageType} Package*/}
        {/*</Text>*/}

        <CustomBtn label={'Сменить имя'} validating={() => setChangeName(prev => !prev)} />

        {changeName && newFather !== null && newName !== null && <View>
          <Text style={{fontWeight: 800, marginBottom: 10, color: 'gray'}}>Новые Фамили и имя</Text>

          <TextInput
            style={[styles.input, nameError && styles.error]}
            placeholder="Имя Фамилия"
            value={newName}
            onChangeText={(text) => {
              setNewName(text)
              setNameError(false)
            }}
            keyboardType="email-address"
          />

          <Text style={{fontWeight: 800, marginBottom: 10, color: 'gray'}}>Имя отца указывается в иминительном падеже (Пример: Игорь, Павел)</Text>

          <TextInput
            style={[styles.input, nameError && styles.error]}
            placeholder="Имя отца"
            value={newFather}
            onChangeText={(text) => {
              setNewFather(text)
              setNameError(false)
            }}
            keyboardType="email-address"
          />

          {nameError && <Text style={{color: "red", marginBottom: 15}}>Пустные поля не допустимы</Text>}

          <CustomBtn dis={loadingBTN} label={'Сменить имя'} validating={change_name} />
        </View>}
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  avatar: {
    width: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  package: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  premium: {
    backgroundColor: 'gold',
    color: 'black',
  },
  standard: {
    backgroundColor: 'gray',
    color: 'white',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    borderColor: "red"
  }
});
