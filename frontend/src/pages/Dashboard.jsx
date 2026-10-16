import React, { useEffect, useState } from "react";
import { Paper, Typography, Stack, Alert } from "@mui/material";
export default function Dashboard() {
  const [status, setStatus] = useState("checking");
  useEffect(() => {
    fetch(
      import.meta.env.VITE_API_BASE_URL
        ? `${import.meta.env.VITE_API_BASE_URL}/api/health`
        : "http://127.0.0.1:5000/api/health",
    )
      .then((r) => {
        if (!r.ok) throw Error("API unavailable");
        return r.json();
      })
      .then((v) => setStatus(v.status))
      .catch(() => setStatus("Backend not reachable"));
  }, []);
  return (
    <Paper sx={{ p: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Dashboard</Typography>
        <Alert severity={status === "ok" ? "success" : "warning"}>
          Backend status: {status}
        </Alert>
        <Typography color="text.secondary">
          File counts and wallet data will be integrated in future milestones.
        </Typography>
      </Stack>
    </Paper>
  );
}
