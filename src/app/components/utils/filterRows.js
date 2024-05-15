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
 * Directory: components
 * File: utils
 * Archive: filterRows.js
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

const textMatches = (searchText, ...values) => {
  const searchTextLower = searchText.toLowerCase();
  return values.some((value) => value.toLowerCase().includes(searchTextLower));
};

const castDateToCrDateString = (date) => {
  const dateCast = new Date(date);
  const inputDate = dateCast.toLocaleDateString("en-CA", { timeZone: "UTC" });
  return inputDate;
};
export const filterState = (rows) => {
  return rows.filter((row) => row.state !== 'Cumplido');
};


export const filterRowA = (rows, filter, searchText) => {
  return rows.filter((row) => {
    let agreementIdFormatted = `DSC-ACD-${row.agreementId.consecutive}-${row.agreementId.month}-${row.agreementId.year}`;
    return (
      (filter === "" || row.state === filter) &&
      (searchText === "" ||
        textMatches(
          searchText,
          row.topic,
          row.description,
          row.state,
          agreementIdFormatted,
          row.users.name,
          `Sesion ${row.session.type} N.${row.session.sessionId.consecutive}`,
          castDateToCrDateString(row.creationDate),
          castDateToCrDateString(row.deadline)
        ))
    );
  });
};

export const filterRowS = (rows, filter, text) => {
  return rows.filter((row) => {
    return (
      (filter === "" || row.type === filter) &&
      (text === "" ||
        textMatches(
          text,
          row.type,
          row.UrlVideo,
          castDateToCrDateString(row.date)
        ))
    );
  });
};
