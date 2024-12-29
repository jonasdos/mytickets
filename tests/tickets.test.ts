import app from "../src/index"
import supertest from "supertest"
import prisma from "database"
import { newEventDataTest } from "./factories/events"
import { newTicketDataTest } from "./factories/tickets"

const api = supertest(app)
let eventId = 0
let ticketId = 0
beforeAll(async() => {
  //deletar todos os registros
const eventData = newEventDataTest()
const {body } = await api.post("/events").send(eventData)
    eventId = body.id

})

describe("POST /tickets",() => {
  it("Should return status 201 and body with ticket created", async() => {
    //arange 
    const newTicketData = newTicketDataTest(eventId)

    //act 
    const {status, body} = await api.post("/tickets").send(newTicketData)
    ticketId = body.id
    //assert
    expect(status).toBe(201)
    expect(body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      owner: expect.any(String),
      code: expect.any(String),
      used: expect.any(Boolean),
      eventId: expect.any(Number)
    }))
  })
})
describe("GET /tickets/:eventId", () => {
  it("Should return all tickets from id event", async () => {
    //arrange 
    
    // act 
    const {status, body} = await api.get(`/tickets/${eventId}`)
    
   //assert
    expect(status).toBe(200)
     expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
      owner: expect.any(String),
      code: expect.any(String),
      used: expect.any(Boolean),
      eventId: expect.any(Number)
        })
      ])
     )

  })
})
describe("PUT /tickets", () => {
  it("should return status 204", async() => {
    const {status} = await api.put(`/tickets/use/${ticketId}`)
    expect(status).toBe(204)
  })
  it("should return ticket.used == true", async() => {
    const {body} = await api.get(`/tickets/${eventId}`)
    let ticketUsed = false
    body.forEach(ticket => {
      if(ticket.id === ticketId) {
        ticketUsed = ticket.used
      }
    })
    expect(ticketUsed).toBe(true)
  })
})