import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { contactSchema } from "../../libs/helper";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      country: "",
      zipCode: "",
    },
    email: "",
    phone: "",
  });
  
  const [formErrors, setFormErrors] = useState({});

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactSchema.validate(formData, { abortEarly: false });

      const response = await fetch(`http://localhost:8080/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setFormErrors(validationErrors);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginTop: "20px", marginLeft: "20px" }}
        onClick={() => navigate("/")}
      >
        Back To Home
      </Button>
      <Container maxWidth="sm">
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "20px",
            backgroundColor: "#f7f7f7",
            marginTop: "20px",
          }}
        >
          <h2>Contact Details Form</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              error={!!formErrors.firstName}
              helperText={formErrors.firstName || ""}
            />
            <TextField
              fullWidth
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              error={!!formErrors.lastName}
              helperText={formErrors.lastName || ""}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                error={!!formErrors.gender}
                helperText={formErrors.gender || ""}
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              error={!!formErrors.email}
              helperText={formErrors.email || ""}
            />
            <TextField
              fullWidth
              label="Phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              error={!!formErrors.phone}
              helperText={formErrors.phone || ""}
            />
            <TextField
              fullWidth
              label="Address Line 1"
              type="text"
              name="address.line1"
              value={formData.address.line1}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address Line 2"
              type="text"
              name="address.line2"
              value={formData.address.line2}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="City"
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Country"
              type="text"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Zip Code"
              type="text"
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ContactForm;
