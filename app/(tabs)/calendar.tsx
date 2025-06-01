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
import Constants from "expo-constants";
import {fetch_week_report} from "@/app/lib/fetch-week-report";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetch_month_report} from "@/app/lib/fetch-month-report";



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
  const router = useRouter()

  const PACKAGE: "standard" | "premium" = "standard";

  const [stateFull, setStateFull] = useState<{full: string, first: string, second: string}[]>([])
  const today = new Date().toISOString().split('T')[0];
  const [processed, setProcessed] = useState<boolean>(false)

  useEffect(() => {
    const fetching_report = async () => {
      const email = await AsyncStorage.getItem('userToken');

      if (typeof email === "string") {
        const now = new Date()
        let response;
        if (PACKAGE === "standard") {
          response = await fetch_week_report(email, now.toString())
        } else {
          response = await fetch_month_report(email, now.toString())
        }
        setStateFull(response)
      }
      setProcessed(true)
    }
    fetching_report()
  }, [])

  const days: {date: string, id: number}[] = Array.from({ length: PACKAGE === "standard" ? 7 : 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return { date: d.toISOString().split('T')[0], id: i };
  });

  const WeekFromNow = new Date();
  WeekFromNow.setDate(WeekFromNow.getDate() + PACKAGE === "standard" ? 6 : 29);

  const maxDate = WeekFromNow.toISOString().split('T')[0];

  // loading component
  if (!processed) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // actual component
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

          // Day component
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
                  style={{ color: state === 'disabled' ? '#2d4150' : '#2d4150' }}>
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
                          backgroundColor: dayEntry ? stateFull[dayEntry.id].first : "black",
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
                          backgroundColor: dayEntry ? stateFull[dayEntry.id].full : "black",
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
                          backgroundColor: dayEntry ? stateFull[dayEntry.id].second : "black",
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