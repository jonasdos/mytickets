import { CreateEventData } from "repositories/events-repository";
import { faker } from '@faker-js/faker'

export function newEventDataTest () {
  const eventData: CreateEventData = {
  name: faker.music.artist(),
  date: faker.date.future()
}
return eventData
}
export function newEventDataTestError () {
  const eventData: CreateEventData = {
  name: faker.music.artist(),
  date: faker.date.past()
}
return eventData
}
export function notFoundIndex(array) {
  let number = faker.number.int({min: 1, max: 50000
  })
  for(let i=true;i===true; number = faker.number.int({min: 1, max: 50000
  }) ) {
    if(!array.includes(number)) {
      i = false
    }
  }
  
  return number

  
}