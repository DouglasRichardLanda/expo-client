import {Text, TouchableOpacity} from "react-native";
import React from "react";


export default function CustomBtn({validating, label}: {label: string, validating: () => void}) {

  return (
    <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 1, marginBottom: 15 }} onPress={validating}>
      <Text style={{ color: 'white', textAlign: 'center' }}>{label}</Text>
    </TouchableOpacity>
  )
}