import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "@redux/store.ts";
import CustomThemeProvider from "./components/providers/CustomThemeProvider";
import router from "./app/router";
import { worker } from "./mocks/browser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import OverlayProvider from "@hooks/use-overlay/OverlayProvider.tsx";

const queryClient = new QueryClient();

async function main() {
  // msw 세팅 시작
  if (import.meta.env.VITE_LOCAL_MODE !== "true") {
    await worker.start({
      serviceWorker: {
        url: "mockServiceWorker.js",
      },
      onUnhandledRequest: "bypass",
    });
  }
  // msw 세팅 끝

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  const persistor = persistStore(store);

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CustomThemeProvider>
              <OverlayProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <RouterProvider router={router} />
                </Suspense>
              </OverlayProvider>
            </CustomThemeProvider>
          </PersistGate>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

main();
