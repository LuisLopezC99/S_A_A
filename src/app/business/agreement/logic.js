export const completeAgreements = (agreements) => {
  agreements.forEach((agreement) => {
    agreement.state === "Cumplido" || agreement.state === "Tramitado" || agreement.state === "Externo" || agreement.state === "Vencido"
      ? (agreement.state = agreement.state)
      : (agreement.state = agreementState(new Date(agreement.deadline)));
    // si el estado pasa a vencido deberia de setearse en bd
  });
}

export const agreementState = (deadline) => {
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  deadline.setUTCHours(0, 0, 0, 0);
  const MilisecsDiff = deadline.getTime() - currentDate.getTime();
  const daysDiff = Math.floor(MilisecsDiff / (1000 * 60 * 60 * 24));
  if (daysDiff <= 0) {
    return 'Vencido';
  } else if (daysDiff > 0 && daysDiff <= 3) {
    return 'Por vencer';
  } else {
    return 'Pendiente';
  }
}

export const agreementID = () => {
  let year = new Date().getFullYear()
  return year
}
export const castDayGet = (day) => {
  // let day2: string = (String)Date
  // return day2; 
  return ""
}
export const castDayPost = (day) => {
  return new Date()
}