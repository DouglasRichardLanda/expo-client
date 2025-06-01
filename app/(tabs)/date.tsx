import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomBtn from "@/components/custom/CustomBtn";
import DateWheelPicker from "@/components/custom/DateWheel";
import {any_day_report} from "@/app/lib/fetch-day-report";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {piper} from "@/app/lib/piper";


const DatePicker: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  const [fullResponse, setFullResponse] = useState<string>("white")
  const [firstResponse, setFirstResponse] = useState<string>("white")
  const [secondResponse, setSecondResponse] = useState<string>("white")

  const onChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  const calculate_for_day = async () => {
    // any_day_report("1", date.toISOString()).then(async (data: any) => {
    //   const { firstHalfResult, secondHalfResult, fullDayResult } = await data.json();

    //   alert(`Первая половина дня: ${piper(firstHalfResult)}\nВторая половина дня: ${piper(secondHalfResult)}\nДень в целом: ${piper(fullDayResult)}`)
    // })
    const email = await AsyncStorage.getItem('userToken');
    if (typeof email === "string") {
      const date = new Date(year, month - 1, day);
      const {firstHalfResult, secondHalfResult, fullDayResult} = await any_day_report(email, date.toString())
      setFullResponse(fullDayResult)
      setFirstResponse(firstHalfResult)
      setSecondResponse(secondHalfResult)
    }
  }

  return (
    <View style={{ padding: 20 }}>

      <DateWheelPicker day={day} setDay={setDay} month={month} setMonth={setMonth} year={year} setYear={setYear} />

      <CustomBtn label={"Расчитать на эту дату"} validating={calculate_for_day} />

      <View style={{padding: 20, flex: 1, flexDirection: "column", gap: 20}}>
        <Text>На весь день:
          <Text style={{backgroundColor: fullResponse, marginLeft: 10, padding: 5}}>
            {piper(fullResponse)}
          </Text>
        </Text>
        <Text>На первую половину:
          <Text style={{backgroundColor: firstResponse, marginLeft: 10, padding: 5}}>
            {piper(firstResponse)}
          </Text>
        </Text>
        <Text>На вторую половину:
          <Text style={{backgroundColor: secondResponse, marginLeft: 10, padding: 5}}>
            {piper(secondResponse)}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default DatePicker;
