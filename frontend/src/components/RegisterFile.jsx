
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import { registerFile } from "../services/blockchain";

export default function RegisterFile() {
  const [cid, setCid] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(event) {
    event.preventDefault();

    setError("");
    setResult("");

    if (!cid.trim()) {
      setError("Please enter an IPFS CID.");
      return;
    }

    try {
      setLoading(true);

      const receipt = await registerFile(cid);

      setResult(
        `File registered! Transaction: ${receipt.hash}`
      );

      setCid("");
    } catch (err) {
      setError(err.shortMessage || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 550, mt: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">
            Register File on Blockchain
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Enter the CID of a file already stored on IPFS.
          </Typography>

          <form onSubmit={handleRegister}>
            <Stack spacing={2}>
              <TextField
                label="IPFS Content Identifier (CID)"
                value={cid}
                onChange={(e) => setCid(e.target.value)}
                fullWidth
                required
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register File"}
              </Button>
            </Stack>
          </form>

          {result && <Alert severity="success">{result}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </CardContent>
    </Card>
  );
}
