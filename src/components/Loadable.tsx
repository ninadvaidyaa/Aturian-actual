/* eslint-disable react/display-name */
import { Suspense } from "react";
import type { ElementType } from "react";

import Loader from "./Loader";
import { ErrorBoundary } from "react-error-boundary";

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
export default Loadable;
