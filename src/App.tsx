import { RouterProvider } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import router from "routes";
import ThemeProvider from "themes";
import { DragPreview } from "components/lib/ReactTable/ColumnHeader";

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
        <DragPreview />
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
