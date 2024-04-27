import { getTodayAgreements } from "./agreement/crud.js";
import { transporter } from '../components/tools/nodemailer.js';

const getAgreements = async () => {
  const response = await getTodayAgreements();
  console.log(response);
  if (response.length > 0) {
    response.map(agreement => sendEmail(agreement));
  }
}

const sendEmail = async (agreement) => {
  const { topic, description, users: { name, email } } = agreement;
  const mailOptions = {
    from: process.env.NOTIFIER_EMAIL,
    to: email,
    subject: 'Acuerdos pronto a vencer',
    html: `
      <div>
        <h1>Acuerdos pronto a vencer</h1>
        <p>Buenos días, ${name}</p>
        <p>Se le recuerda que tiene un acuerdo pronto a vencer.</p>
        <p><strong>Datos del acuerdo:</strong></p>
        <ul>
          <li><strong>Tema:</strong> ${topic}</li>
          <li><strong>Descripción:</strong> ${description}</li>
        </ul>
        <p>Saludos cordiales,</p>
        <p><strong>Municipalidad de Tibás</strong></p>
      </div>
    `
  };
  const info = await transporter.sendMail(mailOptions);
  console.log(info);
}

getAgreements();