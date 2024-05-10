/**
 * Proyect: Sistema de acuerdos y actas municipales (SAA)
 * Company: Municipalidad de Tibás
 * Universidad Nacional de Costa Rica
 * School of Informatic
 * Information Systems Engineering
 * 
 * Date: 10/05/2024
 * Principal_Directory: src
 * Directory_1: app
 * Directory: business
 * File: agreement
 * Archive: logic.js
 * 
 * Authors:
 * - Scrum: Luis Ignacio López Castro
 *   - email: luis.lopez.castro@est.una.ac.cr
 *   - ID: 402420889
 * - David Coto Solano
 *   - email: victor.coto.solano@est.una.ac.cr
 *   - ID: 305440064
 * - Andrés León Orozco
 *   - email: andres.leon.orozco@est.una.ac.cr
 *   - ID: 118920778
 * - Eduardo Aarón Ojeda Paladino
 *   - email: eduardo.ojeda.paladino@est.una.ac.cr
 *   - ID: 116500136
 * - Jennifer Quirós Chacón
 *   - email: jennifer.quiros.chacon@est.una.ac.cr
 *   - ID: 702790153
 * - José Miguel Sequeira Hernández
 *   - email: jose.sequeira.hernandez@est.una.ac.cr
 *   - ID: 116590034
 */

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