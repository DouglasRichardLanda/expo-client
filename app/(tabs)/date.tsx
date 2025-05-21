import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const IP = "192.168.0.27"
async function any_day_report (id: string, date: string) {
  console.log(date)
  return await fetch(`http://${IP}:5000/api/anydatereport?id=${id}&date=${date}`, {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  })
}

const DatePicker: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Выбери Дату" onPress={() => setShow(true)} />
      <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: 800 }}>Выбранная дата: {date.toDateString()}</Text>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <Button title="Расчитать на эту дату" onPress={() => {
        any_day_report("1", date.toISOString()).then(async (data: any) => {
          const { firstHalfResult, secondHalfResult, fullDayResult } = await data.json();
          function piper (arg: string) {
            if (arg === "green") {
              return "Удача"
            } else if (arg === "red") {
              return "Неудача"
            } else {
              return "Середина"
            }
          }
          alert(`Первая половина дня: ${piper(firstHalfResult)}\nВторая половина дня: ${piper(secondHalfResult)}\nДень в целом: ${piper(fullDayResult)}`)
        })
      }} />
      <Text>---------------------------------------------</Text>

    </View>
  );
};

export default DatePicker;
