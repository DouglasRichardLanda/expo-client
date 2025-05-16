import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function NotesPage() {
  const params = useLocalSearchParams();
  const { date } = params; // The date string passed from calendar
  const [notes, setNotes] = useState('');

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Notes for {date}</Text>
      <TextInput
        multiline
        placeholder="Write your notes here..."
        value={notes}
        onChangeText={setNotes}
        style={{
          height: 200,
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          textAlignVertical: 'top',
        }}
      />
      <Button title="Save" onPress={() => {/* save your notes logic here */}} />
    </View>
  );
}
