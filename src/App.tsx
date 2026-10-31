import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnalyticsRouteTracker } from "./components/AnalyticsRouteTracker";
import { CardProvider } from "./context/CardContext";
import { LandingPage } from "./pages/LandingPage";

const EditorPage = lazy(() =>
  import("./pages/EditorPage").then((m) => ({ default: m.EditorPage }))
);

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-bg text-fg-muted">
      Loading…
    </div>
  );
}

const routerBasename =
  import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <CardProvider>
      <BrowserRouter basename={routerBasename}>
        <AnalyticsRouteTracker />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CardProvider>
  );
}
