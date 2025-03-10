import "jest-location-mock";
import '@testing-library/jest-dom'
import server from "@/__mock__/server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});