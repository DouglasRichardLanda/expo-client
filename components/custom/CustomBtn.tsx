import {Text, TouchableOpacity} from "react-native";
import React from "react";


export default function CustomBtn({validating, label, dis=false}: {dis?: boolean, label: string, validating: () => void}) {

  return (
    <TouchableOpacity disabled={dis} style={[{ backgroundColor: 'blue', padding: 10, borderRadius: 1, marginBottom: 15 }, dis && {backgroundColor: 'gray'}]} onPress={validating}>
      <Text style={{ color: 'white', textAlign: 'center' }}>{label}</Text>
    </TouchableOpacity>
  )
}