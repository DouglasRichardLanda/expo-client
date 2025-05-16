import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import {useEffect, useState} from "react";
import {Picker} from '@react-native-picker/picker';
import CalendarDay from "@/components/CalendarDay";
import {useRouter} from "expo-router";

const IP = "192.168.0.27"
async function fetch_week_report (id: string, date: string) {
  return await fetch(`http://${IP}:5000/api/weekreport?id=${id}&current=${date}`, {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  })
}

export default function CalendarPage() {
  LocaleConfig.locales['ru'] = {
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ],
    monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
    dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    dayNamesShort: ['Пон.', 'Втр.', 'Ср.', 'Чет.', 'Пят.', 'Суб.', 'Вс.'],
    today: "Сегодня"
  };
  LocaleConfig.defaultLocale = 'ru';

  const [state14, setState14] = useState<{first: string, second: string, full: string}[]>([])
  const router = useRouter()

  const [selected, setSelected] = useState('');
  const [note, setNote] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const [processed, setProcessed] = useState<boolean>(false)

  useEffect(() => {
    fetch_week_report("12345678", today).then(async (data: any) => {
      const {firstHalfResults, secondHalfResults, fullDayResults} = await data.json()
      for (let i = 0; i < 14; i++) {
        setState14(prev => [...prev, {
          first: firstHalfResults[i],
          second: secondHalfResults[i],
          full: fullDayResults[i]
        }])
      }
    }).then(() => setProcessed(true))
  }, [])


  // const [inputText, setInputText] = useState('');
  // const [filteredList, setFilteredList] = useState([]);
  // const items = [
  //   'Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes', 'Mango', 'Strawberry',
  // ];
  // const handleChange = (text) => {
  //   setInputText(text);
  //   const filtered = items.filter(item => item.toLowerCase().includes(text.toLowerCase()));
  //   setFilteredList(filtered);
  // };

  const days: {date: string, id: number}[] = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return { date: d.toISOString().split('T')[0], id: i };
  });

  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

  const maxDate = twoWeeksFromNow.toISOString().split('T')[0];

  if (!processed) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <ScrollView>
      <Calendar
        disableAllTouchEventsForDisabledDays={true}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 400
        }}
        maxDate={maxDate}
        hideExtraDays={true} // Hide days from other months
        firstDay={1}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          // todayTextColor: '#00adf5',
          // todayBackgroundColor: 'blue',
          dayTextColor: '#2d4150',
          textDisabledColor: '#A0A0A0',
          textInactiveColor: '#3399FF',
          selectedDayBackgroundColor: '#3399FF',
          selectedDayTextColor: '#ffffff',

        }}
        renderArrow={(direction: string) => (
          <Text style={{fontSize: 24, color: 'black', margin: 10}}>
            {direction === 'left' ? '◀' : '▶'} {/* Custom Arrow */}
          </Text>
        )}
        markingType="custom"
        dayComponent={({ date, state }:{date: any, state: any}) => {
          const dayEntry = days.find((d) => d.date === date.dateString);
          const isMarked = !!dayEntry;
          const daynote = date.dateString;
          const indexEntry = dayEntry?.id;
          const isToday = date.dateString === today;


          return (
            <TouchableOpacity
              onPress={() => {
                router.push(`/notes/${daynote}`);  // Navigate to dynamic page
              }}
              // disabled={state === 'disabled'}
              // style={{
              //   alignItems: 'center',
              //   padding: 6,
              //   borderRadius: 10,
              //   backgroundColor: '#D6F1FF',
              //   borderWidth: 2,
              //   borderColor: dateString === new Date().toISOString().split('T')[0] ? 'black' : 'transparent',
              // }}
            >
              <View style={{ alignItems: 'center', padding: 6, borderRadius: 10, backgroundColor: '#D6F1FF', borderWidth: 2,
                borderColor: isToday ? 'black' : "transparent"}}>
                <Text
                  // onPress={() => {
                  //   const selectedDay = days.find(([dateString]) => dateString === date.dateString);
                  //
                  //   if (days.includes(date.dateString)) {
                  //     setSelected(date.dateString)
                  //   } else {
                  //     setSelected(new Date().toISOString().split('T')[0])
                  //   }
                  //   console.log(selected) // Set the selected date when the day is pressed
                  // }}
                  style={{ color: state === 'disabled' ? '#d9e1e8' : '#2d4150' }}>
                  {date.day}
                </Text>

                {isMarked && (
                  <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    {[...Array(1)].map((_, i) => (
                      <View
                        key={i}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: dayEntry ? state14[dayEntry.id].first : "black",
                          marginHorizontal: 1,
                        }}
                      />
                    ))}
                    {[...Array(1)].map((_, i) => (
                      <View
                        key={i}
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: 3,
                          backgroundColor: dayEntry ? state14[dayEntry.id].full : "black",
                          marginHorizontal: 1,
                        }}
                      />
                    ))}
                    {[...Array(1)].map((_, i) => (
                      <View
                        key={i}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: dayEntry ? state14[dayEntry.id].second : "black",
                          marginHorizontal: 1,
                        }}
                      />
                    ))}
                  </View>
                )}
                {!isMarked && (
                  <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    {[...Array(3)].map((_, i) => (
                      <View
                        key={i}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 3,
                          backgroundColor: ['gray', 'gray', 'gray'][i],
                          marginHorizontal: 1,
                        }}
                      />
                    ))}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />


      {/*<View style={styles.notebookContainer}>*/}
      {/*  <Text style={styles.notebookHeader}>Заметки на {selected || "(выбери день)"}</Text>*/}
      {/*  <ScrollView style={styles.notebook}>*/}
      {/*    <TextInput*/}
      {/*      style={styles.textInput}*/}
      {/*      placeholder="Опиши свой день..."*/}
      {/*      multiline*/}
      {/*      value={note}*/}
      {/*      onChangeText={setNote}*/}
      {/*    />*/}

      {/*  </ScrollView>*/}
      {/*</View>*/}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: 20,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 400,
  },
  notebookContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginTop: 20,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5, // For Android
  },
  notebookHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  notebook: {
    height: 400,
    maxHeight: 200,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    height: 300,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});