// filterRows.js

const textMatches = (searchText, ...values) => {
  const searchTextLower = searchText.toLowerCase();
  return values.some((value) => value.toLowerCase().includes(searchTextLower));
};

const castDateToCrDateString = (date) => {
  const dateCast = new Date(date);
  const inputDate = dateCast.toLocaleDateString("en-CA", { timeZone: "UTC" });
  return inputDate;
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
