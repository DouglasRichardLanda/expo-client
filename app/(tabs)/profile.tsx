import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileScreen() {
  const user = {
    avatar: 'https://via.placeholder.com/100', // Placeholder image
    firstName: 'Антон',
    lastName: 'Кравчук',
    email: 'john.doe@example.com',
    registrationDate: '2024-03-22',
    packageType: 'Premium',
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image source={{ uri: user.avatar }} style={styles.avatar} />

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
    alignItems: 'center',
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
