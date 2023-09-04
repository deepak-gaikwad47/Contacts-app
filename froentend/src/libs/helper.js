import * as yup from "yup";
import { genderOptions } from "./constants";


export const contactSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required"),
    lastName: yup
      .string()
      .required("Last name is required"),
    gender: yup
      .string()
      .required("Gender is required")
      .oneOf(genderOptions, "Invalid gender option"),
    address: yup.object().shape({
      line1: yup
        .string()
        .required("Address Line 1 is required")
        .min(8, "Address Line 1 must be at least 8 characters"),
      line2: yup.string(),
      city: yup.string().required("City is required"),
      country: yup
        .string()
        .required("Country is required")
        .max(50, "Country must be at most 50 characters"),
      zipCode: yup
        .string()
        .required("Zip Code is required")
        .max(10, "Zip Code must be at most 10 characters"),
    }),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Invalid phone number format (10 digits)"),
});
