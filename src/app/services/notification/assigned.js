import { transporter } from '../../components/tools/nodemailer.js';
import { getUserById } from '../users/crud.js';

export const assignedEmail = async (agreement) => {
    const {topic, description, asignedTo, deadline} = agreement;
    if (!asignedTo) return;
    const {name, email} = await getUserById(asignedTo);
    try {
        sendAssignedEmail(topic, description, deadline, name, email);
    } catch (error) {
        console.log(error);
        throw new Error("Error al enviar el correo");
    }

}

export const sendAssignedEmail = async (topic, description, deadline, name, email) => {
    const mailOptions = {
        from: process.env.NOTIFIER_EMAIL,
        to: email,
        subject: 'Acuerdo asignado',
        html: `
          <div>
            <h1>Acuerdo asignado</h1>
            <p>Buenos días, ${name}</p>
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
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
} 