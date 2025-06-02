async function validateForm(event) {

  event.preventDefault(); // Prevent the default form submission behavior

  const name = document.getElementById("name").value;
  const doctor = document.getElementById("doctor").value;
  const date = document.getElementById("date").value;

  if (!name || !doctor || !date) {
      alert("Please fill in all fields.");
      return false;
  }

  // Create the payload object
  const appointmentData = {
      patient_name: name,
      doctor_name: doctor,
      appointment_date: date
  };

  try {
    console.log(appointmentData);
      // Make a POST request to the API
      const response = await fetch("http://localhost:3000/appointments", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(appointmentData)
      });

      console.log(response);

      if (response.ok) {
          const result = await response.json();
          alert("Appointment successfully booked for " + name);
          console.log("Appointment Response:", result);
      } else {
          const error = await response.text();
        //   alert("Failed to book appointment: " + error);
      }
  } catch (error) {
      console.error("Error booking appointment:", error);
    //   alert("An error occurred while booking the appointment.");
  }

  return false; // Prevent form submission
}

async function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission reload

    // Collect form data
    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const gender = document.querySelector('select[name="Gender"]').value;
    const disease = document.getElementById("disease").value;
    const totalAmount = document.getElementById("Total Amount").value;
    const address = document.getElementById("address").value;

    // Validate form data
    if (!name || !mobile || !gender || !disease || !totalAmount || !address) {
        alert("Please fill in all fields.");
        return false;
    }

    // Create payload object
    const billingData = {
        patient_name: name,
        mobile_no: mobile,
        gender: gender,
        disease: disease,
        total_amount: totalAmount,
        address: address
    };

    try {
        // Send data to the backend API
        const response = await fetch("http://localhost:3000/patients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(billingData)
        });

        if (response.ok) {
            const result = await response.json();
            alert("Billing record created successfully!");
            console.log("Response:", result);
        } else {
            const error = await response.text();
            alert("Failed to create billing record: " + error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting the billing record.");
    }

    return false; // Ensure the form does not reload
}





