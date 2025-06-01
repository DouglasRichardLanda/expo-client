import Constants from "expo-constants";


const IP: string = Constants.expoConfig?.extra?.IP;


export async function change_user_name (newname: string, newfather: string, email: string) {
  try {

    const response = await fetch(`http://${IP}:5000/data/changename`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: newname, father: newfather, email})
    })
    // const data = await response.json()

  } catch (e) {

  }
}