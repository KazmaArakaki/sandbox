import createResumeController from "./controllers/post-api-resume-create";

export default app => {
  app.post("/api/resume/create", createResumeController);
}
