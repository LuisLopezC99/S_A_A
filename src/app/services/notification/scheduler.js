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
 * Directory: services
 * File: notification
 * Archive: scheduler.js
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

import { getTodayAgreements } from "../agreement/crud.js";
import { transporter } from '../../components/tools/nodemailer.js';
import cron from 'node-cron';
import { sendEmailToSecretary } from './assigned.js';

const getAgreements = async () => {
  const response = await getTodayAgreements();
  console.log(response);
  if (response.length > 0) {
    response.forEach(agreement => agreement.users.name !== "externo" ? sendEmail(agreement.topic, agreement.description, agreement.users.name, agreement.users.email)
    :
    sendEmailToSecretary(agreement.topic, agreement.description, agreement.users.name, sendEmail, true) )
  }
}


const sendEmail = async (topic, description, username, email) => {
  const mailOptions = {
    from: process.env.NOTIFIER_EMAIL,
    to: email,
    subject: 'Acuerdos pronto a vencer',
    html: `
      <div>
        <h1>Acuerdos pronto a vencer</h1>
        <p>Buenos días, ${username}</p>
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

// Obvio aquí está por minuto pero en la documentación está la manera de configurarlo
// en caso de que se requiera cada día o cuando lo determinemos
cron.schedule('* * * * *', () => {
  getAgreements();
});


