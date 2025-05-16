import { StripeProvider } from '@stripe/stripe-react-native';
import {useEffect, useState} from "react";
import {ActivityIndicator, Button, Text, View} from "react-native";

const Standardpay = () => {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    // const key = await fetchKey(); // fetch key from your server here
    // setPublishableKey(key);
  };

  useEffect(() => {
    // fetchPublishableKey();
  }, []);

  const [loading, setLoading] = useState(false);

  const openPaymentSheet = async () => {
    setLoading(true);
    // call presentPaymentSheet() here
    setLoading(false);
  };

  return (
    <StripeProvider publishableKey="your_key_here">
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>
          Complete your payment
        </Text>

      </View>
    </StripeProvider>
  );
}

export default Standardpay
