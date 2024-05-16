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
 * Archive: assigned.js
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

import { transporter } from '../../components/tools/nodemailer.js';
import { getUserById } from '../users/crud.js';
import { getSecetariaUsers } from '../users/crud.js';

// Sends an email notification for an assigned agreement to the relevant user or secretary.
export const assignedEmail = async (agreement) => {
    const {topic, description, asignedTo, deadline} = agreement;
    
    // Check if the agreement is not assigned to anyone
    if (!asignedTo) return;

    // Retrieve user details based on the assignedTo ID
    const {name, email} = await getUserById(asignedTo);
    try {
      // Send an email notification based on the user's role
        name !== "externo" ?
        sendAssignedEmail(topic, description, deadline, name, email) :
        sendEmailToSecretary(topic, description, deadline, sendAssignedEmail);
    } catch (error) {
        
        throw new Error("Error al enviar el correo"); // Throw an error if there's an issue with sending the email
    }

}

// Sends an email notification for an assigned agreement to the specified user.
export const sendAssignedEmail = async (topic, description, deadline, name, email, isExternal = false) => {
    const mailOptions = {
        from: process.env.NOTIFIER_EMAIL,
        to: email,
        subject: 'Acuerdo asignado',
        html: !isExternal ? `
          <div>
            <h1>Acuerdo asignado</h1>
            <p>Buen día, ${name}</p>
            <p>Se le ha asignado un nuevo acuerdo.</p>
            <p><strong>Datos del acuerdo:</strong></p>
            <ul>
              <li><strong>Tema:</strong> ${topic}</li>
              <li><strong>Descripción:</strong> ${description}</li>
              <li><strong>Fecha límite:</strong> ${deadline}</li>
            </ul>
            <p>Saludos cordiales,</p>
            <p><strong>Municipalidad de Tibás</strong></p>
          </div>
        `
        :
        `
          <div>
            <h1>Acuerdo asignado a Externo</h1>
            <p>Buen día, ${name}</p>
            <p>Se ha asignado un nuevo acuerdo a un departamento externo.</p>
            <p><strong>Datos del acuerdo:</strong></p>
            <ul>
              <li><strong>Tema:</strong> ${topic}</li>
              <li><strong>Descripción:</strong> ${description}</li>
              <li><strong>Fecha límite:</strong> ${deadline}</li>
            </ul>
            <p>Saludos cordiales,</p>
            <p><strong>Municipalidad de Tibás</strong></p>
          </div>
        `
    };
    await transporter.sendMail(mailOptions); // Sends the email using nodemailer transporter
} 

// Sends an email notification to the secretary or secretarial department users.
export const sendEmailToSecretary = async (topic, description, deadline = "", emailFunction, isReminder = false) => {
    // Retrieve secretary or secretarial department users
    const users = await getSecetariaUsers();
    // Iterate through each user and send email notifications
    // Send reminder email if isReminder is true, otherwise send regular email
    users.forEach( async (user) => !isReminder ? emailFunction(topic, description, deadline, user.name, user.email, true) : emailFunction(topic, description, user.name, user.email))
}