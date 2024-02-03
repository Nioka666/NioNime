import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function ProgressLoad() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress color="warning" />
    </Box>
  );
}
