import Constants from "expo-constants";


const IP = Constants.expoConfig?.extra?.IP;

export async function fetch_week_report (email: string, date: string) {
  try {
    const response =  await fetch(`http://${IP}:5000/api/weekreport?email=${email}&current=${date}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
    const {report} = await response.json()
    return report
  } catch (e) {
    console.error(e)
    return {}
  }
}