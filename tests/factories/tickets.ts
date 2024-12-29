import { CreateEventData } from "repositories/events-repository";
import { faker } from '@faker-js/faker'
import { CreateTicketData } from "repositories/tickets-repository";

export function newTicketDataTest (eventId: number) {
  const ticketData: CreateTicketData = {
    owner: faker.person.fullName(),
    code: String(faker.number.int({
      min:100, max: 50000
    })),
    eventId: eventId
}
return ticketData
}

