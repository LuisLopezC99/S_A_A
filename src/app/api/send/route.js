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
 * Directory: api
 * File: send
 * Archive: route.js
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

//import { Resend } from 'resend';
import { transporter } from '../../components/tools/nodemailer';
import { NextResponse } from "next/server";

//const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
  
    const { name, email, password, subject } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Correo electrónico de destino no proporcionado' }, { status: 400 });
    }
    
    // Configure the email options based on the subject
    const info = await transporter.sendMail({
      from: process.env.NOTIFIER_EMAIL, // Sender email address
      to: email, // Recipient email address
      subject, // Email subject
      html: `
        <div>
          <h1>Hola, ${name}!</h1>
          ${subject === 'Recuperar contraseña' ?
            `<p>Se ha solicitado un cambio de contraseña para su cuenta.</p>
            <p>Su contraseña temporal es la siguiente: <strong style="font-size: 1.2em;">${password}</strong></p>
            <p>Favor dar click al siguiente botón para ingresar su nueva contraseña.</p>`
          : subject === 'Cambio de contraseña' ?
            `<p>Su contraseña ha sido cambiada correctamente.</p>
            <p>Click para ingresar a su cuenta.</p>`
          :
            `<p>Su cuenta se ha sido creada y activada correctamente.</p>
            <p>Su contraseña temporal es la siguiente: <strong style="font-size: 1.2em;">${password}</strong></p>
            <p>Favor dar click al siguiente botón para ingresar a su cuenta.</p>`
          }
        </div>
        <button>
        <a href="http://localhost:3000/">Ingresar a la página</a>
        </button>
      `
    });
    return NextResponse.json(info); // Return the response containing the email information
  }
  catch (error) {
    return NextResponse.json({ error }); // Return an error response
  }
}
