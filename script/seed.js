'use strict';

const { db } = require('../server/db');
const {
  models: { User, Product },
} = require('../server/db');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'Peter',
      email: 'petecummings@hotmail.com',
      password: '12345',
      firstName: 'Peter',
      lastName: 'Cummings',
      address: '19596 141st pl se',
      state: 'Wa',
      city: 'Monroe',
      postalCode: '98272',
      isAdmin: true,
    }),
    User.create({
      username: 'Dale',
      email: 'daleluce87@gmail.com',
      password: '12345',
      firstName: 'Dale',
      lastName: 'Luce',
      address: '1234 121st pl se',
      state: 'In',
      city: 'Indianapolis',
      postalCode: '98765',
      isAdmin: true,
    }),
    User.create({
      username: 'Matt',
      email: 'mattyard11@gmail.com',
      password: '12345',
      firstName: 'Matt',
      lastName: 'Yard',
      address: '1234 121st st ne',
      state: 'Ma',
      city: 'Boston',
      postalCode: '98765',
      isAdmin: true,
    }),
    User.create({
      username: 'Austin',
      email: 'unversed1241@yahoo.com',
      password: '12345',
      firstName: 'Austin',
      lastName: 'Gautney',
      address: '1234 121st pl se',
      state: 'Wa',
      city: 'Puyallup',
      postalCode: '98765',
      isAdmin: true,
    }),
    User.create({
      username: 'Sean',
      email: 'seandoe@gmail.com',
      password: '12345',
      firstName: 'Sean',
      lastName: 'Doe',
      address: '1234 121st st se',
      state: 'Wa',
      city: 'Monroe',
      postalCode: '98765',
      isAdmin: false,
    }),
  ]);

  console.log(`seeded ${users.length} users`);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: 'Absolut',
      price: 18.99,
      quantity: 100,
      description: 'Absolut Perfection',
      imageUrl: '../public/images/absolute.jpeg',
    }),
    Product.create({
      name: 'Belvedere',
      price: 25.99,
      quantity: 100,
      description: 'Know the difference',
      imageUrl: '../public/images/belvedere.jpeg',
    }),
    Product.create({
      name: 'Blue Ice',
      price: 17.99,
      quantity: 85,
      description: 'hand crafted American potato vodka',
      imageUrl: '../public/images/blue ice.jpeg',
    }),
    Product.create({
      name: 'Chopin',
      price: 25.99,
      quantity: 125,
      description: 'Life is fast, sip slowly',
      imageUrl: '../public/images/chopin.jpeg',
    }),
    Product.create({
      name: 'Ciroc',
      price: 27.99,
      quantity: 90,
      description: ' a new standard for vodka',
      imageUrl: '../public/images/ciroc.jpeg',
    }),
    Product.create({
      name: 'Crystal Head',
      price: 29.99,
      quantity: 55,
      description: 'a resoundingly Pure Spirit',
      imageUrl: '../public/images/crystal head.jpeg',
    }),
    Product.create({
      name: 'Effen',
      price: 27.99,
      quantity: 82,
      description: 'be proudly different',
      imageUrl: '../public/images/effen.jpeg',
    }),
    Product.create({
      name: 'Grey Goose',
      price: 28.99,
      quantity: 100,
      description: 'fly beyond',
      imageUrl: '../public/images/goose.jpeg',
    }),
    Product.create({
      name: 'Hanson Organic',
      price: 26.99,
      quantity: 132,
      description: 'family owner artisan distillers',
      imageUrl: '../public/images/hanson vodka.jpeg',
    }),
    Product.create({
      name: 'Ketel One',
      price: 28.99,
      quantity: 121,
      description: 'drink marvelously',
      imageUrl: '../public/images/ketel one.jpeg',
    }),
    Product.create({
      name: 'Khor',
      price: 22.99,
      quantity: 45,
      description: 'ultimate perfection',
      imageUrl: '../public/images/khor.jpeg',
    }),
    Product.create({
      name: 'Krakus',
      price: 27.99,
      quantity: 64,
      description: 'exclusive',
      imageUrl: '../public/images/krakus.jpeg',
    }),
    Product.create({
      name: 'Mont Blanc',
      price: 22.99,
      quantity: 85,
      description: 'Luxury has a new name',
      imageUrl: '../public/images/mont blanc.jpeg',
    }),
    Product.create({
      name: 'Ocean Organic',
      price: 34.99,
      quantity: 130,
      description: 'Go beyond the bottle',
      imageUrl: '../public/images/ocean.jpeg',
    }),
    Product.create({
      name: 'Reyka',
      price: 23.99,
      quantity: 75,
      description: '“Made with glacial spring water',
      imageUrl: '../public/images/reyka.jpeg',
    }),
    Product.create({
      name: 'Skyy',
      price: 19.99,
      quantity: 89,
      description: 'a fresher tasting vodka',
      imageUrl: '../public/images/skyy.jpeg',
    }),
    Product.create({
      name: 'Svedka',
      price: 17.99,
      quantity: 90,
      description: 'bring your own spirit',
      imageUrl: '../public/images/svedka.jpeg',
    }),
    Product.create({
      name: "Tito's",
      price: 20.99,
      quantity: 145,
      description: 'handmade',
      imageUrl: '../public/images/titos.jpeg',
    }),
    Product.create({
      name: 'Snow Leopard',
      price: 29.99,
      quantity: 72,
      description: 'a spirit with a soul',
      imageUrl: '../public/images/snow leopard.jpeg',
    }),
    Product.create({
      name: 'Crater Lake',
      price: 19.99,
      quantity: 63,
      description: 'the spirit of adventure',
      imageUrl: '../public/images/crater lake.jpeg',
    }),
  ]);
  console.log(`seeded ${products.length} products`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
