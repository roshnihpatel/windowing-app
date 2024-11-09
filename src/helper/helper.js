import { faker } from '@faker-js/faker';

 export const bigList = [...Array(500)].map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar()
}));