import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import {useRouter} from "expo-router";
import {backgroundColor} from "react-native-calendars/src/style";

export default function SubscriptionForm() {
  const [selected, setSelected] = useState<'standard' | 'premium' | null>(null);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Subscription</Text>

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






      <TouchableOpacity
        activeOpacity={1}
        style={[
          {
            backgroundColor: '#7a7a7a',
            borderColor: selected ? '#7a7a7a' : 'green',
            paddingVertical: 60,
            paddingHorizontal: 25,
            borderRadius: 12,
            borderWidth: 2,
            marginVertical: 8,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
        onPress={() => setSelected('standard')}
      >
        <Text
          style={{
            color: '#fff',
          }}
        >
          <Text style={{textAlign: 'center'}}>
            Standard{"\n"}
            <Text style={{ fontSize: 25 }}>3.99£ per Month</Text>
          </Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          {
            backgroundColor: 'gold',
            borderColor: selected ? 'green' : 'gold',
            paddingVertical: 60,
            paddingHorizontal: 25,
            borderRadius: 12,
            borderWidth: 2,
            marginVertical: 8,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
        onPress={() => {
          setSelected('premium')
          router.replace("/standardpay")
        }}
      >
        <Text
          style={{
            color: '#555',
            textAlign: 'center'
          }}
        >
          Premium{"\n"}
          <Text style={{ fontSize: 25 }}>7.99£ per Month</Text>
        </Text>
      </TouchableOpacity>





      <TouchableOpacity
        disabled={!selected}
        onPress={() => console.log('Selected:', selected)}
        style={[styles.subscribeBtn, !selected && styles.disabledBtn]}
      >
        <Text style={styles.subscribeText}>Subscribe</Text>
      </TouchableOpacity>




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },




  option: {
    paddingVertical: 60,
    paddingHorizontal: 25,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  standard: {
    backgroundColor: '#d3d3d3', // light gray
  },
  premium: {
    backgroundColor: '#ffd700', // gold
  },
  optionText: {
    fontSize: 18,
    color: '#555',
  },
  subscribeBtn: {
    marginTop: 25,
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 12,
  },
  disabledBtn: {
    backgroundColor: '#aac8ff',
  },
  subscribeText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
