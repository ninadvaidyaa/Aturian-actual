import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "contexts/ConfigContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "api/reactQuery";
import App from "App";

if (import.meta.env.MODE === "development") {
  const { worker } = await import("mocks/browser");
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  worker.start({
    onUnhandledRequest: "bypass",
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
      
        <App />
        
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
  
);
