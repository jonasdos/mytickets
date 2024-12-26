import { any, number, string } from "joi"
import app from "../src/index"
import supertest from "supertest"
import { CreateEventData } from "repositories/events-repository"
import prisma from "database"


const api = supertest(app)
beforeAll(async() => {
 
  //deletar todos os registros
  console.log("Cleaning tests database")
  await prisma.event.deleteMany()
})
afterAll(async() => {
  console.log("Cleaning tests database")
  await prisma.event.deleteMany()
})
describe("POST /events", () => {
  it("Should return created event", async () => {
    const eventData: CreateEventData = {
      name: "Novo Evento a3",
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

