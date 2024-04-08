export function formatSessions(sessions) {
  // Realiza la transformación de CreateSession a FormatSession aquí
  const formattedSessions = sessions.map((session) => {
      return {
          id: session.id,
          date: session.date.toISOString(), // Suponiendo que deseas la fecha en formato ISO8601
          report: session.report,
          type: session.type,
          facebookUrl: session.UrlVideo,
      };
  });

  return formattedSessions;
}
