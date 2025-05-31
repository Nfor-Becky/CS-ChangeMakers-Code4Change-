import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const SendMoneyForm = () => {
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [operator, setOperator] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState(""); // ✅ new state for payment ID

  const apiKey = "qnoYzuMb4JOdAxNpzo42T";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setPaymentId("");

    const cameroonPhoneRegex = /^2376\d{8}$/;
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid amount greater than 0");
      setError(true);
      return;
    }

    if (!cameroonPhoneRegex.test(phoneNumber)) {
      setMessage("Enter a valid Cameroon phone number (e.g. 237650000000)");
      setError(true);
      return;
    }

    if (!operator) {
      setMessage("Please select a telecom operator");
      setError(true);
      return;
    }

    const paymentData = {
      amount: Number(amount),
      phoneNumber: phoneNumber.trim(),
      telecomOperator: operator,
      paymentType: "disbursement",
      ...(description && { description: description.trim() }),
    };

    setLoading(true);

    try {
      const response = await fetch("https://api.pay.mynkwa.com/disburse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { id, status, amount, telecomOperator, createdAt, description: resDescription } = data;

      setPaymentId(id); // ✅ Save the payment ID

      setMessage(
        `✅ Money Sent Successfully!\n` +
        `🆔 Payment ID: ${id}\n` +
        `📱 Phone: ${phoneNumber}\n` +
        `💰 Amount: ${amount} FCFA\n` +
        `📡 Operator: ${telecomOperator.toUpperCase()}\n` +
        `📝 Description: ${resDescription || "N/A"}\n` +
        `📅 Created At: ${new Date(createdAt).toLocaleString()}\n` +
        `📈 Status: ${status.toUpperCase()}`
      );
      setError(false);

      setAmount("");
      setPhoneNumber("");
      setDescription("");
      setOperator("");
    } catch (error) {
      console.error("Disbursement error:", error);
      setMessage(`❌ Disbursement error: ${error.message}`);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <Box
        maxWidth={400}
        width="100%"
        p={4}
        borderRadius={3}
        boxShadow={6}
        bgcolor="#fff"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
          Send Money
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              label="Amount (FCFA)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              required
              InputProps={{ style: { background: "#f0f4ff" } }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              label="Phone Number (e.g. 237650000000)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              InputProps={{ style: { background: "#f0f4ff" } }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              label="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={2}
              InputProps={{ style: { background: "#f0f4ff" } }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="operator-label">Telecom Operator</InputLabel>
            <Select
              labelId="operator-label"
              value={operator}
              label="Telecom Operator"
              onChange={(e) => setOperator(e.target.value)}
              required
              sx={{ background: "#f0f4ff" }}
            >
              <MenuItem value="mtn">MTN</MenuItem>
              <MenuItem value="orange">Orange</MenuItem>
            </Select>
          </FormControl>
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={loading}
              fullWidth
              sx={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                py: 1.5,
                borderRadius: 2,
                background: "linear-gradient(90deg, #2e7d32 60%, #66bb6a 100%)",
                boxShadow: 3,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Send Money"}
            </Button>
          </Box>
          {message && (
            <Alert severity={error ? "error" : "success"} sx={{ mt: 2, whiteSpace: "pre-line", textAlign: "center" }}>
              {message}
            </Alert>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default SendMoneyForm;
