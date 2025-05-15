import {Tabs, useRouter} from 'expo-router';
import {Button, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontAwesome5} from '@expo/vector-icons'; // Import icons
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabsLayout() {
  const router = useRouter();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('userToken');
    router.replace('/auth'); // Redirect to auth screen
  };

  return (
    <Tabs screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => {
        let iconName;

        if (route.name === 'profile') {
          iconName = 'user';
          return <FontAwesome5 name={'user'} size={size} color={color}/>;
        } else if (route.name === 'calendar') {
          iconName = 'calendar-alt';
          return <FontAwesome5 name={'calendar-alt'} size={size} color={color}/>;
        } else if (route.name === 'date') {
          return <AntDesign name={'dotchart'} size={size} color={color}/>;
          iconName = 'date'
        } else {
          return <FontAwesome5 name={"unknown"} size={size} color={color}/>;
        }
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {backgroundColor: '#fff'},
    })}>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleSignOut}
              style={{
                backgroundColor: 'black',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 5,
                marginRight: 10
              }}
            >
              <Text style={{color: 'white', fontWeight: 'bold'}}>Sign Out</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleSignOut}
              style={{
                backgroundColor: 'black',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 5,
                marginRight: 10
              }}
            >
              <Text style={{color: 'white', fontWeight: 'bold'}}>Sign Out</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="date"
        options={{
          title: "Date",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleSignOut}
              style={{
                backgroundColor: 'black',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 5,
                marginRight: 10
              }}
            >
              <Text style={{color: 'white', fontWeight: 'bold'}}>Sign Out</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
