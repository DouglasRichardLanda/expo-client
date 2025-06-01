import Constants from "expo-constants";


const IP: string = Constants.expoConfig?.extra?.IP;

export async function login_check (email: string, password: string) {
  try {

    const response = await fetch(`http://${IP}:5000/register/login?email=${email}&password=${password}`, {
      method: "GET",
      headers: {"Content-Type": 'application/json'}
    })

    const data = await response.json();
    return data;
  } catch (e) {
    return {success: false}
  }
}