import { TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';

const CalendarDay = ({ date, state }) => {
  const router = useRouter();
  const dateString: string = date.dateString;

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`./${dateString}`);
      }}
      disabled={state === 'disabled'}
      style={{
        alignItems: 'center',
        padding: 6,
        borderRadius: 10,
        backgroundColor: '#D6F1FF',
        borderWidth: 2,
        borderColor: dateString === new Date().toISOString().split('T')[0] ? 'black' : 'transparent',
      }}
    >
      <Text style={{ color: state === 'disabled' ? '#d9e1e8' : '#2d4150' }}>
        {date.day}
      </Text>

      {/* Your marking dots here, unchanged */}
    </TouchableOpacity>
  );
};
