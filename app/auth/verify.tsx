import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Constants from "expo-constants";


const VerifyScreen = () => {
  const router = useRouter();
  const IP: string = Constants.expoConfig?.extra?.IP;
  const [code, setCode] = useState('');

  const [error, setError] = useState<boolean>(false)

  const validating = async () => {
    const response = await fetch(`http://${IP}:5000/register/second`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({usercode: code})
    })
    const {success, id} = await response.json();
    console.log(success)
    return success === true ? router.replace(`./fill?id=${id}`) : setError(true);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.label]}>Код был выслан вам на почту</Text>
      <TextInput
        style={[styles.input, error && styles.errorLabel]}
        keyboardType="numeric"
        maxLength={4}
        value={code}
        onChangeText={setCode}
        placeholder="_ _ _ _"
      />
      {error && <Text style={{ marginBottom: 15, color: "red" }}>Неправильный ввод кода</Text>}
      <Button title="Подтвердить" disabled={code.length !== 4} onPress={validating} />

    </View>
  );
};


const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  label: { fontSize: 16, marginBottom: 10, textAlign: "center" },
  errorLabel: { borderColor: "red" },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    letterSpacing: 10,
    textAlign: 'center',
  },
});

export default VerifyScreen;
