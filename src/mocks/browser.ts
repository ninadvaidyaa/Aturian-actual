import { setupWorker } from "msw";
import { handlers } from "./handlers";
export const worker = setupWorker(...handlers);

// if (import.meta.env.MODE === "development") {
//   // eslint-disable-next-line @typescript-eslint/no-floating-promises
//   worker.start();
// }
