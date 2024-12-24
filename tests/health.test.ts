import app from "../src/index"
import supertest from "supertest"

const api = supertest(app)

describe("teste da rota health", () => {
  it("should return status 200 and a message", async () => {
    const {status, text} = await api.get("/health")
    expect(text).toBe(`I'm okay!`)
    expect(status).toBe(200)
  })
})