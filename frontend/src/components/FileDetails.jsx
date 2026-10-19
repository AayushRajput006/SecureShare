
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

import {
  getFileCount,
  getFileDetails
} from "../services/blockchain";

export default function FileDetails() {
  const [fileId, setFileId] = useState("1");
  const [file, setFile] = useState(null);
  const [count, setCount] = useState(null);
  const [error, setError] = useState("");

  async function handleCheck() {
    setError("");
    setFile(null);

    try {
      const total = await getFileCount();
      setCount(total);

      const details = await getFileDetails(fileId);
      setFile(details);
    } catch (err) {
      setError(err.shortMessage || err.message);
    }
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 600, mt: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">
            Blockchain File Details
          </Typography>

          <TextField
            label="File ID"
            type="number"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
          />

          <Button variant="contained" onClick={handleCheck}>
            Check File
          </Button>

          {count !== null && (
            <Typography>
              Total registered files: {count}
            </Typography>
          )}

          {file && (
            <Stack spacing={1} sx={{ overflowWrap: "anywhere" }}>
              <Typography>
                <b>Owner:</b> {file.owner}
              </Typography>
              <Typography>
                <b>CID:</b> {file.cid}
              </Typography>
              <Typography>
                <b>Uploaded:</b> {file.uploadedAt}
              </Typography>
              <Typography>
                <b>Active:</b> {String(file.active)}
              </Typography>
            </Stack>
          )}

          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </CardContent>
    </Card>
  );
}

