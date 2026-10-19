
import { useState } from "react";
import { Button, Alert, Stack, Typography } from "@mui/material";
import { connectWallet } from "../services/blockchain";

export default function ConnectWallet() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    setLoading(true);
    setError("");

    try {
      const wallet = await connectWallet();
      setAddress(wallet.address);
    } catch (err) {
      setError(err.shortMessage || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: 450 }}>
      <Button
        variant="contained"
        onClick={handleConnect}
        disabled={loading}
      >
        {loading ? "Connecting..." : "Connect MetaMask"}
      </Button>

      {address && (
        <Typography variant="body2">
          Connected: {address}
        </Typography>
      )}

      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
}
