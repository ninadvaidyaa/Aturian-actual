import { Typography } from "@mui/material";
import ThemeProvider from "themes";

function App(): JSX.Element {
  return (
    <ThemeProvider>
    <Typography component='h1' variant="h6">Hello world!</Typography>
    </ThemeProvider>
  );
}

export default App;
