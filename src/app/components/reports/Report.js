import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { PDFDocument } from "pdf-lib";


const Report = async ({ rows, header, title, state,type, filter,sesion }) => {
  const castDateToCrDateString = (date) => {
    const dateCast = new Date(date);
    const inputDate = dateCast.toLocaleDateString("en-CA", { timeZone: "UTC" });
    return inputDate;
  };

  const currentDate = new Date();
  const date = castDateToCrDateString(currentDate);
  const doc = new jsPDF();
  
  const head =
    title === "Sesiones"
      ? header.filter((item) => item !== "Session").concat("Acta") 
      : header.filter((item) => item !== "Acuerdo");
  const fil = filter === "" ? "Ninguno" : filter;
  const stat = state === "" ? "Todos" : state;
  const typ = type === "" ? "Ambos" : type;
  const img = new Image();
  img.src = "/logo-min.png";


    const imgWidth = 15;
    const imgHeight = 17;
    const margin = 5; // Margen
    doc.addImage(img, "PNG", margin, margin, imgWidth, imgHeight);
  
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont("bold");
    doc.text(`Reporte de ${title}`, doc.internal.pageSize.getWidth() / 2, 10, {
      align: "center",
    });

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
    sesion !== "" 
    && (doc.text(`Sesión: `, 15, 45),
    doc.text(`${sesion}`, 28, 45));
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

    const modifiedRows =
      title === "Sesiones"
        ? rows.map((row) => {
            const { id, date, type, UrlVideo, report } = row;
            const dataCasted = castDateToCrDateString(date);
          return [
              dataCasted,
              type,
              UrlVideo,
              report,
            ];
          })
        : rows.map((row) => {
            const agreementIdFormatted = `DSC-ACD-${row.agreementId.consecutive}-${row.agreementId.month}-${row.agreementId.year}`;
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
      head: [head],
      
      body: modifiedRows,
      startY: 55,
      styles: { lineColor: [0, 0, 0], lineWidth: 0.5 },
    });

    const pdfBytes = doc.output("arraybuffer");
    const compressedPdfBytes = await PDFDocument.load(pdfBytes);
    const compressedPdf = await compressedPdfBytes.save();

    const file = new Blob([compressedPdf], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);

    // Crear un enlace temporal
    let tempLink = document.createElement("a");
    tempLink.href = fileURL;

    // Asignar el nombre del archivo al atributo 'download'
    tempLink.download = title;

    // Simular un clic en el enlace
    tempLink.click();

    // Eliminar el enlace temporal
    tempLink.remove();
 
  
};

export default Report;
