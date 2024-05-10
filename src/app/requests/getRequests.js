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
 * Directory: requests
 * Archive: getRequests.js
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

export const getRequest = async (URL) => {
  try {
      const response = await fetch(`http://localhost:3000/api/${URL}`, {
          method: "GET",
          next : {revalidate : 0}
      })

      if (response.ok) {
          const data = await response.json()
          return data
      }
  } catch (error) {
      console.error("Error recovering: ", error)
      return ""
  }
}
export const postDataForm = async (URL, formData) => {
try {
  const response = await fetch(`/api/${URL}`, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
} catch (error) {
  console.error("Error posting data: ", error);
  return false;
}
};
export const postData = async (URL, formData) => {
  
  try {
      const response = await fetch(`/api/${URL}`, {
          headers: {
          'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(formData),
      })
      
      if (response.ok) {
          const data = await response.json()
          return data
      }

      

  } catch (error) {
      console.error("Error posting data: ", error)
      return false
  }
}

export const putData=async(URL,formData)=>{
  try{
      const response = await fetch(`/api/${URL}`, {
          headers: {
          'Content-Type': 'application/json'
          },
          method: 'PUT',
          body: JSON.stringify(formData),
      })
      if (response.ok) {
          const data = await response.json()
          return data
      }
  } catch (error) {
      console.error("Error posting data: ", error)
      return "Error"
  }
}
export const putDataFile = async (URL, formData) => {
  try {
    const response = await fetch(`/api/${URL}`, {
      method: "PUT",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error posting data: ", error);
    return "Error";
  }
};