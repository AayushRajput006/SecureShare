
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material";
import { isAddress } from "ethers";

import {
  grantAccess,
  revokeAccess,
  checkFileAccess
} from "../services/blockchain";

export default function ManageAccess() {
  const [fileId, setFileId] = useState("1");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [hasPermission, setHasPermission] = useState(null);

  async function performAction(action) {
    setMessage("");
    setError("");
    setHasPermission(null);

    if (!/^[1-9]\d*$/.test(fileId)) {
      setError("Enter a valid positive File ID.");
      return;
    }

    if (!isAddress(recipient)) {
      setError("Enter a valid Ethereum wallet address.");
      return;
    }

    try {
      setLoading(true);

      if (action === "grant") {
        const receipt = await grantAccess(fileId, recipient);
        setMessage(`Access granted! Transaction: ${receipt.hash}`);
      } else if (action === "revoke") {
        const receipt = await revokeAccess(fileId, recipient);
        setMessage(`Access revoked! Transaction: ${receipt.hash}`);
      } else {
        const allowed = await checkFileAccess(fileId, recipient);
        setHasPermission(allowed);
      }
    } catch (err) {
      setError(err.shortMessage || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 650, mt: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">
            File Access Management
          </Typography>

          <TextField
            label="File ID"
            type="number"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            fullWidth
          />

          <TextField
            label="Recipient Wallet Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value.trim())}
            placeholder="0x..."
            fullWidth
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              disabled={loading}
              onClick={() => performAction("grant")}
            >
              Grant Access
            </Button>

            <Button
              variant="outlined"
              color="error"
              disabled={loading}
              onClick={() => performAction("revoke")}
            >
              Revoke Access
            </Button>

            <Button
              variant="outlined"
              disabled={loading}
              onClick={() => performAction("check")}
            >
              Check Access
            </Button>
          </Stack>

          {loading && <CircularProgress size={24} />}

          {message && <Alert severity="success">{message}</Alert>}

          {hasPermission !== null && (
            <Alert severity={hasPermission ? "success" : "warning"}>
              {hasPermission
                ? "Recipient has blockchain access."
                : "Recipient does not have blockchain access."}
            </Alert>
          )}

          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </CardContent>
    </Card>
  );
}
