 // Upload the fingerprint and get the blood group prediction from the back-end
async function uploadFingerprint(file) {
  const formData = new FormData();
  formData.append("file", file);
  
  try {
    const response = await fetch("/predict", {
      method: "POST",
      body: formData
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("Server Response: ", data); // Log the server response

      if (data.blood_group) {
        const bloodGroup = data.blood_group;
        
        // Update the page and the pop-up with the detected blood group
        document.getElementById("result").innerText = `Detected Blood Group: ${bloodGroup}`;
        document.getElementById("selectedBloodGroup").innerText = bloodGroup;
        openPopup();
      } else {
        alert("Error: Blood group not detected.");
      }
    } else {
      alert("Error: Unable to contact the server or invalid response.");
    }
  } catch (error) {
    alert("Error: An error occurred while processing the request.");
    console.error(error); // Log the error to the console
  }
}
