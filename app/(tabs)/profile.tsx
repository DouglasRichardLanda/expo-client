import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {fetch_user_data} from "@/app/lib/fetch-user-data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";

export default function ProfileScreen() {
  const user = {
    avatar: 'https://via.placeholder.com/100', // Placeholder image
    firstName: 'Антон',
    lastName: 'Кравчук',
    email: 'john.doe@example.com',
    registrationDate: '2024-03-22',
    packageType: 'Premium',
  };
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true)
  const [userData, setUserData] = useState<null | any>(null)

  useEffect(() => {
    const fetching_data = async () => {
      const email = await AsyncStorage.getItem('userToken');

      if (typeof email === 'string') {
        fetch_user_data(email).then(() => {

        })
      } else {
        router.replace("/auth/auth")
      }
    }
    fetching_data()
  }, []);

  return (
    <View style={styles.container}>
      {/* User Details */}
      <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>Registered: {user.registrationDate}</Text>
      <Text style={[styles.package, user.packageType === 'Premium' ? styles.premium : styles.standard]}>
        {user.packageType} Package
      </Text>
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
});
