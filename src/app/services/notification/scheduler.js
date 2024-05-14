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

// Retrieves agreements for the current day and sends email notifications based on user roles.
const getAgreements = async () => {
  // Retrieve agreements for the current day
  const response = await getTodayAgreements();
  // Check if there are agreements to process
  if (response.length > 0) {
    // Iterate through each agreement and send emails based on user roles
    // Send email to internal user or secretary based on user role
    response.forEach(agreement => agreement.users.name !== "externo" ? sendEmail(agreement.topic, agreement.description, agreement.users.name, agreement.users.email)
    :
    sendEmailToSecretary(agreement.topic, agreement.description, agreement.users.name, sendEmail, true) )
  }
}

// Sends an email notification about agreements soon to expire to the specified user.
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
  const info = await transporter.sendMail(mailOptions); // Return a promise that resolves after sending the email
  
}

// Schedule a cron job to run the getAgreements function every minute.
cron.schedule('* * * * *', () => {
  getAgreements();
});


