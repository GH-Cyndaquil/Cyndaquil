'use strict';

const { db } = require('../server/db');
const {
  models: { User, Product, Ingredient, Region, Order },
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
      state: 'WA',
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
      state: 'IN',
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
      state: 'MA',
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
      state: 'WA',
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
      state: 'WA',
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
      imageUrl: '/images/absolut.jpeg',
    }),
    Product.create({
      name: 'Belvedere',
      price: 25.99,
      quantity: 100,
      description: 'Know the difference',
      imageUrl: '/images/belvedere.jpeg',
    }),
    Product.create({
      name: 'Blue Ice',
      price: 17.99,
      quantity: 85,
      description: 'hand crafted American potato vodka',
      imageUrl: '/images/blue ice vodka.jpeg',
    }),
    Product.create({
      name: 'Chopin',
      price: 25.99,
      quantity: 125,
      description: 'Life is fast, sip slowly',
      imageUrl: '/images/chopin.jpeg',
    }),
    Product.create({
      name: 'Ciroc',
      price: 27.99,
      quantity: 90,
      description: ' a new standard for vodka',
      imageUrl: '/images/ciroc.jpeg',
    }),
    Product.create({
      name: 'Crystal Head',
      price: 29.99,
      quantity: 55,
      description: 'a resoundingly Pure Spirit',
      imageUrl: '/images/crystal head.jpeg',
    }),
    Product.create({
      name: 'Effen',
      price: 27.99,
      quantity: 82,
      description: 'be proudly different',
      imageUrl: '/images/effen.jpeg',
    }),
    Product.create({
      name: 'Grey Goose',
      price: 28.99,
      quantity: 100,
      description: 'fly beyond',
      imageUrl: '/images/goose.jpeg',
    }),
    Product.create({
      name: 'Hanson Organic',
      price: 26.99,
      quantity: 132,
      description: 'family owner artisan distillers',
      imageUrl: '/images/hanson vodka.jpeg',
    }),
    Product.create({
      name: 'Ketel One',
      price: 28.99,
      quantity: 121,
      description: 'drink marvelously',
      imageUrl: '/images/ketel one.jpeg',
    }),
    Product.create({
      name: 'Khor',
      price: 22.99,
      quantity: 45,
      description: 'ultimate perfection',
      imageUrl: '/images/khor.jpeg',
    }),
    Product.create({
      name: 'Krakus',
      price: 27.99,
      quantity: 64,
      description: 'exclusive',
      imageUrl: '/images/krakus.jpeg',
    }),
    Product.create({
      name: 'Mont Blanc',
      price: 22.99,
      quantity: 85,
      description: 'Luxury has a new name',
      imageUrl: '/images/mont blanc.jpeg',
    }),
    Product.create({
      name: 'Ocean Organic',
      price: 34.99,
      quantity: 130,
      description: 'Go beyond the bottle',
      imageUrl: '/images/ocean vodka.jpeg',
    }),
    Product.create({
      name: 'Reyka',
      price: 23.99,
      quantity: 75,
      description: '“Made with glacial spring water',
      imageUrl: '/images/reyka.jpeg',
    }),
    Product.create({
      name: 'Skyy',
      price: 19.99,
      quantity: 89,
      description: 'a fresher tasting vodka',
      imageUrl: '/images/skyy.jpeg',
    }),
    Product.create({
      name: 'Svedka',
      price: 17.99,
      quantity: 90,
      description: 'bring your own spirit',
      imageUrl: '/images/svedka.jpeg',
    }),
    Product.create({
      name: "Tito's",
      price: 20.99,
      quantity: 145,
      description: 'handmade',
      imageUrl: '/images/titos.jpeg',
    }),
    Product.create({
      name: 'Snow Leopard',
      price: 29.99,
      quantity: 72,
      description: 'a spirit with a soul',
      imageUrl: '/images/snow leopard.jpeg',
    }),
    Product.create({
      name: 'Crater Lake',
      price: 19.99,
      quantity: 63,
      description: 'the spirit of adventure',
      imageUrl: '/images/crater lake.jpeg',
    }),
  ]);
  console.log(`seeded ${products.length} products`);

  //Creating Regions
  const regions = await Promise.all([
    Region.create({
      name: 'United States',
    }),
    Region.create({
      name: 'France',
    }),
    Region.create({
      name: 'Sweden',
    }),
    Region.create({
      name: 'Poland',
    }),
    Region.create({
      name: 'Ukrain',
    }),
    Region.create({
      name: 'Iceland',
    }),
    Region.create({
      name: 'Netherlands',
    }),
  ]);
  console.log(`seeded ${regions.length} regions`);

  // Creating Ingredients
  const ingredients = await Promise.all([
    Ingredient.create({
      name: 'Wheat',
    }),
    Ingredient.create({
      name: 'Potato',
    }),
    Ingredient.create({
      name: 'Grape',
    }),
    Ingredient.create({
      name: 'Sugar Cane',
    }),
    Ingredient.create({
      name: 'Wheat and Barley',
    }),
    Ingredient.create({
      name: 'Corn',
    }),
    Ingredient.create({
      name: 'Rye',
    }),
    Ingredient.create({
      name: 'Spelt Grain',
    }),
  ]);
  console.log(`seeded ${ingredients.length} ingredients`);

  //Creating Orders
  const orders = await Promise.all([
    Order.create({
      orderDate: new Date(),
      shipAddress: '1234 21st pl se',
      shipState: 'WA',
      shipCity: 'Bellevue',
      shipPostalCode: '98004',
    }),
    Order.create({
      orderDate: new Date(),
      shipAddress: '1235 21st pl se',
      shipState: 'WA',
      shipCity: 'Seattle',
      shipPostalCode: '98002',
    }),
    Order.create({
      orderDate: new Date(),
      shipAddress: '1236 21st pl se',
      shipState: 'CA',
      shipCity: 'Los Angles',
      shipPostalCode: '90210',
    }),
    Order.create({
      orderDate: new Date(),
      shipAddress: '1223 22nd st ne',
      shipState: 'CA',
      shipCity: 'Los Angeles',
      shipPostalCode: '90210',
    }),
    Order.create({
      orderDate: new Date(),
      shipAddress: '1236 25th pl se',
      shipState: 'WA',
      shipCity: 'Redmond',
      shipPostalCode: '98052',
    }),
  ]);
  console.log(`seeded ${orders.length} orders`);

  //add region and ingredients to product
  await products[0].setRegion(5);
  await products[0].setIngredient(1);
  await products[1].setRegion(3);
  await products[1].setIngredient(7);
  await products[2].setRegion(1);
  await products[2].setIngredient(2);
  await products[3].setRegion(3);
  await products[3].setIngredient(2);
  await products[4].setRegion(2);
  await products[4].setIngredient(3);
  await products[5].setRegion(1);
  await products[5].setIngredient(6);
  await products[6].setRegion(2);
  await products[6].setIngredient(1);
  await products[7].setRegion(1);
  await products[7].setIngredient(3);
  await products[8].setRegion(2);
  await products[8].setIngredient(1);
  await products[9].setRegion(7);
  await products[9].setIngredient(1);
  await products[10].setRegion(4);
  await products[10].setIngredient(6);
  await products[11].setRegion(3);
  await products[11].setIngredient(7);
  await products[12].setRegion(2);
  await products[12].setIngredient(1);
  await products[13].setRegion(1);
  await products[13].setIngredient(4);
  await products[14].setRegion(3);
  await products[14].setIngredient(5);
  await products[15].setRegion(1);
  await products[15].setIngredient(1);
  await products[16].setRegion(5);
  await products[16].setIngredient(1);
  await products[17].setRegion(1);
  await products[17].setIngredient(6);
  await products[18].setRegion(3);
  await products[18].setIngredient(8);
  await products[19].setRegion(1);
  await products[19].setIngredient(6);

  //add userId, productId, quantityOrdered, price, fullfiled
  await orders[0].setUser(1);
  await orders[0].addProduct(products[0], {
    through: { price: products[0].price, quantityOrdered: 3, fulfilled: true },
  });
  await orders[0].addProduct(products[2], {
    through: { price: products[2].price, quantityOrdered: 1, fulfilled: true },
  });
  await orders[1].setUser(2);
  await orders[1].addProduct(products[5], {
    through: { price: products[5].price, quantityOrdered: 2, fulfilled: false },
  });
  await orders[1].addProduct(products[7], {
    through: { price: products[7].price, quantityOrdered: 4, fulfilled: false },
  });
  await orders[2].setUser(3);
  await orders[2].addProduct(products[4], {
    through: { price: products[4].price, quantityOrdered: 1, fulfilled: true },
  });
  await orders[2].addProduct(products[8], {
    through: { price: products[8].price, quantityOrdered: 5, fulfilled: true },
  });
  await orders[3].setUser(4);
  await orders[3].addProduct(products[13], {
    through: {
      price: products[13].price,
      quantityOrdered: 4,
      fulfilled: false,
    },
  });
  await orders[3].addProduct(products[11], {
    through: {
      price: products[11].price,
      quantityOrdered: 1,
      fulfilled: false,
    },
  });
  await orders[4].setUser(5);
  await orders[4].addProduct(products[19], {
    through: { price: products[19].price, quantityOrdered: 9, fulfilled: true },
  });
  await orders[4].addProduct(products[16], {
    through: { price: products[16].price, quantityOrdered: 6, fulfilled: true },
  });
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
