import { any, number, string } from "joi"
import app from "../src/index"
import supertest from "supertest"

const api = supertest(app)

describe("GET /events", () => {
  it("Should return all events", async () => {
    const {status, body} = await api.get("/events")
    expect(status).toBe(200)
     expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          date: expect.any(String),
        })
      ])
     )
  })
})