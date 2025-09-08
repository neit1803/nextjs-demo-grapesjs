// lib/api.ts
export async function saveTemplate(data: Record<string, unknown>) {
  return JSON.stringify(data);
//   fetch("http://localhost:8080/api/templates", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
}
