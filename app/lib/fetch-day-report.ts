import Constants from "expo-constants";


const IP = Constants.expoConfig?.extra?.IP;

export async function any_day_report (email: string, date: string) {

  const response = await fetch(`http://${IP}:5000/api/anydatereport?email=${email}&date=${date}`, {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  })
  const {firstHalfResult, secondHalfResult, fullDayResult} = await response.json()
  return {firstHalfResult, secondHalfResult, fullDayResult}
}
