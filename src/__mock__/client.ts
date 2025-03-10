// This file is for browser testing
import { setupWorker } from "msw/browser";

import handlers from "./test";

export const worker = setupWorker(...handlers)