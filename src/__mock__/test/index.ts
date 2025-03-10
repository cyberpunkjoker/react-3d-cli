import { http, HttpResponse } from 'msw'

const handlers = [
  http.get("https://mysite.com/api/role", ({ request, params, cookies }) => {
    return HttpResponse.json({
      userType: "user",
    })
  }),
];

export default handlers;