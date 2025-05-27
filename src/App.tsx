import { Routing } from "./routing";
import { ThemeProvider } from "./shared/utils/theme-provider";

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routing />;
    </ThemeProvider>
  )
}

export default App;
