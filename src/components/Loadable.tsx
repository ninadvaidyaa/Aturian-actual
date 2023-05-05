/* eslint-disable react/display-name */
import { Suspense } from "react";
import type { ElementType } from "react";

import Loader from "./Loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./ErrorPage";

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
export default Loadable;
