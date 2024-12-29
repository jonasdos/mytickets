import app from "../src/index"
import supertest from "supertest"
import prisma from "database"
import { newEventDataTest, newEventDataTestError, notFoundIndex } from "./factories/events"



const api = supertest(app)

beforeAll(async() => {
   //deletar todos os registros
  console.log("Cleaning tests database")
  await prisma.event.deleteMany()
})
let eventId = 0
let eventName = ""
describe("POST /events", () => {
  it("Should return created event", async () => {
   //arange
   const eventData = newEventDataTest()
   //act 
    const {status, body } = await api.post("/events").send(eventData)
    eventId = body.id
    eventName = body.name
    //assert
    expect(status).toBe(201)
    expect(body).toEqual(expect.objectContaining({
     id: expect.any(Number),
     name: expect.any(String),
     date: expect.any(String)
    }))
  })
  it("Should return error 422", async () => {
    //arrange
    const eventData = newEventDataTestError()
    //act 
    const {status } = await api.post("/events").send(eventData)
    //assert
    expect(status).toBe(422)
  })
  it("Should return error 409", async () => {
    //arrange
    const eventData = newEventDataTest()
    eventData.name = eventName
    //act 
    const {status } = await api.post("/events").send(eventData)
    //assert
    expect(status).toBe(409)
  })
  
})

describe("GET /events", () => {
  it("Should return all events", async () => {
    //arrange // act 
    const {status, body} = await api.get("/events")
    
   //assert
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
describe("GET /events/:id", () => {
  it("Should return a event row by id", async() => {
    //arrange 

    //act 
    const {status, body} = await api.get(`/events/${eventId}`)
    //assert 
    expect(status).toBe(200)
    expect(body).toEqual(expect.objectContaining({
      id: expect.any(Number),
          name: expect.any(String),
          date: expect.any(String),
    }))
  })
  it("Should return a error bad request for invalid id", async() => {
    //arrange 
    const id = "0"
    //act 
    const {status} = await api.get(`/events/${id}`)
    //assert
    expect(status).toBe(400)
  })
  it("Should return a error not Found for invalid id", async() => {
    //arrange 
    const {body} = await api.get("/events")
    const ids = []
    body.forEach(element => {
      ids.push(element.id)
    })
    const id = Number(notFoundIndex(ids))
    //act 
    
    const {status} = await api.get(`/events/${id}`)
    //assert
    expect(status).toBe(404)
  })
})

describe("PUT /events", ()=> {
  it("Should return a editing event by id", async () => {
    //arrange 
    
    const eventData = newEventDataTest()
    //act 
    const {status, body } = await api.put(`/events/${eventId}`).send(eventData)
    
    //assert 
    expect(status).toBe(200)
    expect(body).toEqual(expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          date: expect.any(String),
    }))

  })
})

describe("DELET /events", ()=> {
  it("Should return a status code 204", async () => {
    //arrange 
        
    //act 
    const {status} = await api.delete(`/events/${eventId}`)
    
    //assert 
    expect(status).toBe(204)
   
  })
})
