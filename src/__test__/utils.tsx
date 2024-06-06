import { render, RenderOptions, RenderResult } from "@testing-library/react";

// react-router-dom v6의 Router 사용
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@redux/store.ts";
import { Provider } from "react-redux";

interface CustomRenderOptions {
  // render 함수의 option 파라미터 수정
  renderOptions?: RenderOptions;
}

export function CustomRender(
  ui: JSX.Element,
  { ...renderOptions }: CustomRenderOptions
): RenderResult {
  const queryClient = new QueryClient();

  const Wrapper = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={ui} />
          </Routes>
        </Provider>
      </QueryClientProvider>
    );
  };

  return render(Wrapper(), {
    ...renderOptions,
    wrapper: BrowserRouter,
  });
}
