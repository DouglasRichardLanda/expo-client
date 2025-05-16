import { useRouter, useLocalSearchParams } from 'expo-router';
import {View, Text, TextInput, Button, StyleSheet, ScrollView} from 'react-native';
import { useState } from 'react';

export default function NotesPage() {
  const { daynote } = useLocalSearchParams<{ daynote: string }>();

  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  const hours = Array.from({ length: 23 }, (_, i) => i + 1); // 1 to 23

  const handleChange = (hour: number, text: string) => {
    setNotes((prev) => ({ ...prev, [hour]: text }));
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, paddingTop: 50 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Заметки на {daynote}</Text>
      {hours.map((hour) => (
        <View key={hour} style={styles.row}>
          <Text style={styles.hourText}>{hour}:00</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder={`Notes for ${hour}:00`}
            value={notes[hour] || ''}
            onChangeText={(text) => handleChange(hour, text)}
          />
        </View>
      ))}
      <Button title="Save" onPress={() => {/* save logic */}} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#fff' },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  hourText: {
    width: 50,
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    minHeight: 40,
    textAlignVertical: 'top',
  },
});