import express from "express";
import path from "path";
import submitFormHandler from "./api/submit-form";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for forms
  app.post("/api/submit-form", submitFormHandler);
  app.get("/api/submit-form", submitFormHandler);
  app.post("/api/submissions", submitFormHandler);
  app.get("/api/submissions", submitFormHandler);
  
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
