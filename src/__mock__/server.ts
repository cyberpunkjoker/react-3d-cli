// This file is for jest testing.
import { setupServer } from "msw/node";

import handlers from "./test";

const server = setupServer(...handlers);

export default server;