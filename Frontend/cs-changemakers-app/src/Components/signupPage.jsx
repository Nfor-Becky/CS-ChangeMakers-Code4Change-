import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { Lock, Unlock, Upload } from "@mui/icons-material";

function useForm(initialValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setValues({ ...values, [name]: fieldValue });

    if (validateOnChange) validate({ [name]: fieldValue });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    resetForm,
  };
}

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [selectedTab, setSelectedTab] = useState("student");
  const [image, setImage] = useState(null);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    rememberMe: false,
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("email" in fieldValues)
      temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email)
        ? ""
        : "Invalid email.";

    if ("password" in fieldValues)
      temp.password = fieldValues.password.length >= 6
        ? ""
        : "Minimum 6 characters required.";

    if ("confirmPassword" in fieldValues)
      temp.confirmPassword = fieldValues.confirmPassword === values.password
        ? ""
        : "Passwords do not match.";

    if (isSignup) {
      if ("name" in fieldValues)
        temp.name = fieldValues.name ? "" : "Name is required.";
      if ("phone" in fieldValues)
        temp.phone = /^[0-9]{10}$/.test(fieldValues.phone)
          ? ""
          : "Enter a valid 10-digit phone.";
    }

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    errors,
    handleChange,
    resetForm,
  } = useForm(initialValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted", values);
      resetForm();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: 500,
        margin: "auto",
        marginTop: 50,
        padding: 24,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        {isSignup ? "Sign Up" : "Login"}
      </Typography>

      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        centered
        sx={{ marginBottom: 2 }}
      >
        <Tab label="Student" value="student" />
        <Tab label="Enterprise" value="enterprise" />
      </Tabs>

      <form onSubmit={handleSubmit} noValidate>
        {isSignup && (
          <>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              margin="normal"
            />
          </>
        )}

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          margin="normal"
        />

        {isSignup && (
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            margin="normal"
          />
        )}

        {isSignup && (
          <Box textAlign="center" mt={2}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="upload-button"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="upload-button">
              <IconButton component="span">
                <Upload />
              </IconButton>
            </label>
            {image && <Avatar src={image} sx={{ margin: "auto", width: 56, height: 56 }} />}
          </Box>
        )}

        <FormControlLabel
          control={
            <Checkbox
              name="rememberMe"
              checked={values.rememberMe}
              onChange={handleChange}
            />
          }
          label="Remember me"
        />

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            startIcon={isSignup ? <Lock /> : <Unlock />}
            sx={{ mt: 2 }}
          >
            {isSignup ? "Create Account" : "Login"}
          </Button>
        </motion.div>

        <Box textAlign="center" mt={2}>
          <Button color="secondary" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
          </Button>
        </Box>
      </form>
    </motion.div>
  );
};

export default AuthForm;
