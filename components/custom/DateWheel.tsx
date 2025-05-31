import {Picker} from '@react-native-picker/picker';
import {View, Text} from 'react-native';
import {Dispatch, SetStateAction} from 'react';

export default function DateWheelPicker({
                                          year,
                                          month,
                                          day,
                                          setYear,
                                          setMonth,
                                          setDay
                                        }: {
  year: number,
  month: number,
  day: number,
  setYear: Dispatch<SetStateAction<number>>,
  setMonth: Dispatch<SetStateAction<number>>,
  setDay: Dispatch<SetStateAction<number>>
}) {

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 100}, (_, i) => currentYear - i);

  const months = [
    {label: 'Январь', value: 1},
    {label: 'Февраль', value: 2},
    {label: 'Март', value: 3},
    {label: 'Апрель', value: 4},
    {label: 'Май', value: 5},
    {label: 'Июнь', value: 6},
    {label: 'Июль', value: 7},
    {label: 'Август', value: 8},
    {label: 'Сентябрь', value: 9},
    {label: 'Октябрь', value: 10},
    {label: 'Ноябрь', value: 11},
    {label: 'Декабрь', value: 12},
  ];
  const days = Array.from({length: 31}, (_, i) => i + 1);

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      {/* Year Picker */}
      <View style={{flex: 1}}>
        <Text style={{textAlign: 'center', fontWeight: 800}}>Year</Text>
        <Picker selectedValue={year} onValueChange={setYear}>
          {years.map((y) => (
            <Picker.Item key={y} label={y.toString()} value={y}/>
          ))}
        </Picker>
      </View>

      {/* Month Picker */}
      <View style={{flex: 1}}>
        <Text style={{textAlign: 'center', fontWeight: 800}}>Month</Text>
        <Picker selectedValue={month} onValueChange={setMonth}>
          {months.map((m) => (
            <Picker.Item key={m.value} label={m.label} value={m.value}/>
          ))}
        </Picker>
      </View>

      {/* Day Picker */}
      <View style={{flex: 1}}>
        <Text style={{textAlign: 'center', fontWeight: 800}}>Day</Text>
        <Picker selectedValue={day} onValueChange={setDay}>
          {days.map((d) => (
            <Picker.Item key={d} label={d.toString()} value={d}/>
          ))}
        </Picker>
      </View>
    </View>
  );
}
