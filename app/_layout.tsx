import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Login',
          headerLeft: () => <></>
        }}
      />
    </Stack>
  );
}
// This component is used to define shared layout accross all pages (Fornts, ColorSchemes, Navigation layout, headers etc.)