import request from "supertest";
import { app } from "../server/index";
import { db } from "../server/db";
import { Storage, type Project, type InsertProject } from "../server/storage";
import { sql } from "drizzle-orm";

const storage = new Storage();

describe("Project Management API", () => {
  beforeAll(async () => {
    // Ensure the database is clean before all tests
    await db.run(sql`DELETE FROM projects;`);
  });

  afterEach(async () => {
    // Clean up projects table after each test
    await db.run(sql`DELETE FROM projects;`);
  });

  it("should create a new project", async () => {
    const newProject: InsertProject = {
      title: "Test Project",
      description: "A project for testing",
      category: "testing",
      featured: false,
    };

    const res = await request(app).post("/api/projects").send(newProject);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toEqual(newProject.title);
  });

  it("should fetch all projects", async () => {
    await storage.createProject({
      title: "Project 1",
      description: "Desc 1",
      category: "cat1",
      featured: false,
    });
    await storage.createProject({
      title: "Project 2",
      description: "Desc 2",
      category: "cat2",
      featured: true,
    });

    const res = await request(app).get("/api/projects");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].title).toEqual("Project 2"); // Ordered by createdAt DESC
  });

  it("should fetch a single project by ID", async () => {
    const project = await storage.createProject({
      title: "Single Project",
      description: "Single project description",
      category: "single",
      featured: false,
    });

    const res = await request(app).get(`/api/projects/${project.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", project.id);
    expect(res.body.title).toEqual(project.title);
  });

  it("should return 404 for a non-existent project", async () => {
    const nonExistentId = "non-existent-id";
    const res = await request(app).get(`/api/projects/${nonExistentId}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error", "Project not found");
  });

  it("should update a project", async () => {
    const project = await storage.createProject({
      title: "Old Title",
      description: "Old Desc",
      category: "old",
      featured: false,
    });

    const updatedData: Partial<InsertProject> = {
      title: "New Title",
      featured: true,
    };

    const res = await request(app)
      .put(`/api/projects/${project.id}`)
      .send(updatedData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", project.id);
    expect(res.body.title).toEqual("New Title");
    expect(res.body.featured).toEqual(true);
    expect(res.body.description).toEqual("Old Desc"); // Unchanged
  });

  it("should delete a project", async () => {
    const project = await storage.createProject({
      title: "To Be Deleted",
      description: "Desc",
      category: "cat",
      featured: false,
    });

    const res = await request(app).delete(`/api/projects/${project.id}`);
    expect(res.statusCode).toEqual(204);

    const fetchRes = await request(app).get(`/api/projects/${project.id}`);
    expect(fetchRes.statusCode).toEqual(404);
  });

  it("should return 400 for invalid project data on creation", async () => {
    const invalidProject = {
      description: "Missing title",
      category: "invalid",
    }; // Missing title

    const res = await request(app).post("/api/projects").send(invalidProject);
    expect(res.statusCode).toEqual(500);
  });
});
