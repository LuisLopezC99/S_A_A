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

    const info = await transporter.sendMail({
      from: process.env.NOTIFIER_EMAIL,
      to: email,
      subject,
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
    return NextResponse.json(info);
  }
    
  // const data = await resend.emails.send({
  //   from: 'Municipalidad de Tibas <onboarding@resend.dev>',
  //   to: [email],
  //   subject: subject,
  //   react: EmailTemplate({ firstName: name, temporalPassword: password, messageType: messageType }),
  //   text: '',
  // });
  catch (error) {
    console.error('Error al procesar la solicitud POST:', error);
    return NextResponse.json({ error });
  }
}
