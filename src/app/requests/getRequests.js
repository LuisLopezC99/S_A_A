export const getRequest = async (URL) => {
  try {
    console.log(URL);
    const response = await fetch(`http://localhost:3000/api/${URL}`, {
      method: "GET",
      next: { revalidate: 0 },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error recovering: ", error);
    return "";
  }
};

export const postData = async (URL, formData) => {
  try {
    const response = await fetch(`/api/${URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
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

export const putData = async (URL, formData) => {
  try {
    const response = await fetch(`/api/${URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(formData),
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
