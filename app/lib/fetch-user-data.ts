import Constants from "expo-constants";

const IP: string = Constants.expoConfig?.extra?.IP;


export async function fetch_user_data (email: string) {
  try {

    const response = await fetch(`http://${IP}:5000/data/userdata?email=${email}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    const data = await response.json()

    return data
  } catch (e) {
    return {success: false}
  }
}