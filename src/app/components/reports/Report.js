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
 * File: reports
 * Archive: Report.js
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

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { PDFDocument } from "pdf-lib";

//Report function to generate a PDF document with the data of the report
const Report = async ({ rows, header, title, state, type, filter, sesion }) => {
  console.log(rows);
  // Function to convert a date to a specific string format
  const castDateToCrDateString = (date) => {
    const dateCast = new Date(date);
    const inputDate = dateCast.toLocaleDateString("en-CA", { timeZone: "UTC" });
    return inputDate;
  };

  // Function to format a consecutive number
  const formatConsecutive = (consecutive) => {
    consecutive = consecutive.toString();
    const consecutiveLength = consecutive.length < 3 ? 3 : 1;
    consecutive = consecutive.padStart(consecutiveLength, "0");
    return consecutive;
  };


  // Constants for image dimensions and margin
  const imgWidth = 15;
  const imgHeight = 17;
  const margin = 5;

  // Constants for date
  const currentDate = new Date();
  const date = castDateToCrDateString(currentDate);

  // Constant for the PDF document
  const doc = new jsPDF();

  // Function to add a header to the PDF document
  const addHeader = () => {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont("bold");
    doc.text(`Reporte de ${title}`, doc.internal.pageSize.getWidth() / 2, 10, {
      align: "center",
    });
  };

  // Function to add a logo and title to the PDF document
  const addLogoAndTitle = () => {
    const img = new Image();
    img.src = "/logo-min.png";
    doc.addImage(img, "PNG", margin, margin, imgWidth, imgHeight);
    doc.setFontSize(8);
    doc.setTextColor(98, 190, 31);
    doc.setFont("normal");
    doc.text(
      "Sistema de Control de Acuerdos y Actas",
      margin + imgWidth + 5,
      margin + 8,
      {
        align: "left",
      }
    );
    doc.setTextColor(3, 85, 229);
    doc.text("Municipalidad de Tibas", margin + imgWidth + 5, margin + 12, {
      align: "left",
    });
  };

  // Function to add filters information to the PDF document
  const addFilters = () => {
    const fil = filter === "" ? "Ninguno" : filter;
    const stat = state === "" ? "Todos" : state;
    const typ = type === "" ? "Ambos" : type;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("bold");
    title === "Sesiones"
      ? (doc.text(`Tipo: `, 15, 35),
        doc.setFont("normal"),
        doc.text(`${typ}`, 28, 35))
      : (doc.text(`Estado: `, 15, 35),
        doc.setFont("normal"),
        doc.text(`${stat}`, 28, 35));
    doc.setFont("bold");
    doc.text(`Filtrado: `, 15, 40);
    doc.setFont("normal");
    doc.text(`${fil}`, 29, 40);
    sesion !== "" &&
      (doc.text(`Sesión: `, 15, 45), doc.text(`${sesion}`, 28, 45));
    doc.setFontSize(8);
    doc.setTextColor(3, 85, 229);
    doc.text(
      "Fecha de emisión del reporte: ",
      doc.internal.pageSize.getWidth() - 35,
      50,
      {
        align: "right",
      }
    );
    doc.setTextColor(70, 70, 70);
    doc.text(`${date}`, doc.internal.pageSize.getWidth() - 20, 50, {
      align: "right",
    });
  };

  // Function to add a table with data to the PDF document
  const addTable = () => {
    const modifiedRows =
      title === "Sesiones"
        ? rows.map((row) => {
            const { date, type, UrlVideo,sessionId } = row;
            const consecutiveNumber = formatConsecutive(sessionId.consecutive);
            const consecutive = `Sesión ${sessionId.type} No.${consecutiveNumber}`;
            const dataCasted = castDateToCrDateString(date);
            return [consecutive, dataCasted, type, UrlVideo];
          })
        : rows.map((row) => {
            const consecutiveNumber = formatConsecutive(row.agreementId.consecutive);
            const agreementIdFormatted = `DSC-ACD-${consecutiveNumber}-${row.agreementId.month}-${row.agreementId.year}`;
            const topic = row.topic;
            const userName = row.users.name;
            const creationDate = castDateToCrDateString(row.creationDate);
            const deadline = castDateToCrDateString(row.deadline);
            const state = row.state;

            return [
              agreementIdFormatted,
              topic,
              userName,
              creationDate,
              deadline,
              state,
            ];
          });
    doc.autoTable({
      head: [
        header.filter((item) =>
          title === "Sesiones" ? item !== "Session" : item !== "Acuerdo"
        ),
      ],
      body: modifiedRows,
      startY: 55,
      styles: { lineColor: [0, 0, 0], lineWidth: 0.5 },
    });
  };

  // Function to download the PDF document
  const downloadPDF = async () => {
    addHeader();
    addLogoAndTitle();
    addFilters();
    addTable();
    const pdfBytes = doc.output("arraybuffer");
    const compressedPdfBytes = await PDFDocument.load(pdfBytes);
    const compressedPdf = await compressedPdfBytes.save();
    const file = new Blob([compressedPdf], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    let tempLink = document.createElement("a");
    tempLink.href = fileURL;
    tempLink.download = title;
    tempLink.click();
    tempLink.remove();
  };
  downloadPDF();
};

export default Report;
