import { any, number, string } from "joi"
import app from "../src/index"
import supertest from "supertest"
import { CreateEventData } from "repositories/events-repository"


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
describe("POST /events", () => {
  it("Should return created event", async () => {
    const eventData: CreateEventData = {
      name: "Novo Evento aa",
      date: new Date(new Date().setDate(new Date().getDate() + 20))
    }
    const {status, body } = await api.post("/events").send(eventData)
    expect(status).toBe(201)
    expect(body).toEqual(expect.objectContaining({
     id: expect.any(Number),
     name: expect.any(String),
     date: expect.any(String)
    }))
  })
})
