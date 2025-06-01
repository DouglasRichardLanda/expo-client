


export function piper (arg: string) {
  if (arg === "green") {
    return "Удача"
  } else if (arg === "red") {
    return "Неудача"
  } else if (arg === "white") {
    return "-------------"
  } else {
    return "Середина"
  }
}