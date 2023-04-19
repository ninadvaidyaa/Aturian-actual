import { RouterProvider } from "react-router-dom";
import router from "routes";
import ThemeProvider from "themes";

function App(): JSX.Element {
  return (
    <ThemeProvider>
    <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
