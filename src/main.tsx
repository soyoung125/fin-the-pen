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
import Loading from "@components/Loading";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { QUERY_KEY_USER } from "@constants/queryKeys.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 100, // 24 hours
    },
  },
});

const sessionStoragePersister = createSyncStoragePersister({
  storage: window.sessionStorage,
});

persistQueryClient({
  queryClient,
  persister: sessionStoragePersister,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => {
      // 쿼리 키가 'getUserData'인 경우만 영속화
      return query.queryKey[0] === QUERY_KEY_USER;
    },
  },
});

async function main() {
  // msw 세팅 시작
  if (import.meta.env.VITE_LOCAL_MODE !== "true") {
    await worker.start({
      serviceWorker: {
        url: "/mockServiceWorker.js",
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
              <Suspense fallback={<Loading />}>
                <RouterProvider router={router} />
              </Suspense>
            </CustomThemeProvider>
          </PersistGate>
        </Provider>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

main();
