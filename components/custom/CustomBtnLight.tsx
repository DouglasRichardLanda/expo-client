import {Text, TouchableOpacity} from "react-native";
import React from "react";


export default function CustomBtnLight({validating, label, dis=false}: {dis?: boolean, label: string, validating: () => void}) {

  return (
    <TouchableOpacity disabled={dis} style={[{ backgroundColor: 'transparent', padding: 10, borderRadius: 1, marginBottom: 15, marginTop: 15 }, dis && {backgroundColor: 'gray'}]} onPress={validating}>
      <Text style={{ color: 'blue', textAlign: 'left' }}>ACTION: {label}</Text>
    </TouchableOpacity>
  )
}