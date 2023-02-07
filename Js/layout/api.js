const request = axios.create({
  baseURL: "https://blog-backend.up.railway.app/api/v1",
  timeout: 100000,
  headers: { "Content-Type": "application/json" },
});
const backend = axios.create({
  baseURL: "https://blog-backend.up.railway.app/api/v1/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

  