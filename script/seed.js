"use strict";

const { db } = require("../server/db");
const {
  models: { User, Product, Ingredient, Region, Order },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  // Creating Users
  let users = [
    {
      username: "Peter",
      email: "petecummings@hotmail.com",
      password: "12345",
      firstName: "Peter",
      lastName: "Cummings",
      address: "19596 141st pl se",
      state: "WA",
      city: "Monroe",
      postalCode: "98272",
      isAdmin: true,
    },
    {
      username: "Dale",
      email: "daleluce87@gmail.com",
      password: "12345",
      firstName: "Dale",
      lastName: "Luce",
      address: "1234 121st pl se",
      state: "IN",
      city: "Indianapolis",
      postalCode: "98765",
      isAdmin: true,
    },
    {
      username: "Matt",
      email: "mattyard11@gmail.com",
      password: "12345",
      firstName: "Matt",
      lastName: "Yard",
      address: "1234 121st st ne",
      state: "MA",
      city: "Boston",
      postalCode: "98765",
      isAdmin: true,
    },
    {
      username: "Austin",
      email: "unversed1241@yahoo.com",
      password: "12345",
      firstName: "Austin",
      lastName: "Gautney",
      address: "1234 121st pl se",
      state: "WA",
      city: "Puyallup",
      postalCode: "98765",
      isAdmin: true,
    },
    {
      username: "Sean",
      email: "seandoe@gmail.com",
      password: "12345",
      firstName: "Sean",
      lastName: "Doe",
      address: "1234 121st st se",
      state: "WA",
      city: "Monroe",
      postalCode: "98765",
      isAdmin: false,
    },
  ];

  async function seedUsers() {
    for (let i = 0; i < users.length; i++) {
      await User.create(users[i]);
    }
  }
  await seedUsers();

  console.log(`seeded ${users.length} users`);

  // Creating Products
  let products = [
    {
      name: "Absolut",
      price: 18.99,
      quantity: 100,
      description: "Absolut Perfection",
      imageUrl: "/images/absolut.jpeg",
    },
    {
      name: "Belvedere",
      price: 25.99,
      quantity: 100,
      description: "Know the difference",
      imageUrl: "/images/belvedere.jpeg",
    },
    {
      name: "Blue Ice",
      price: 17.99,
      quantity: 85,
      description: "hand crafted American potato vodka",
      imageUrl: "/images/blue ice vodka.jpeg",
    },
    {
      name: "Chopin",
      price: 25.99,
      quantity: 125,
      description: "Life is fast, sip slowly",
      imageUrl: "/images/chopin.jpeg",
    },
    {
      name: "Ciroc",
      price: 27.99,
      quantity: 90,
      description: " a new standard for vodka",
      imageUrl: "/images/ciroc.jpeg",
    },
    {
      name: "Crystal Head",
      price: 29.99,
      quantity: 55,
      description: "a resoundingly Pure Spirit",
      imageUrl: "/images/crystal head.jpeg",
    },
    {
      name: "Effen",
      price: 27.99,
      quantity: 82,
      description: "be proudly different",
      imageUrl: "/images/effen.jpeg",
    },
    {
      name: "Grey Goose",
      price: 28.99,
      quantity: 100,
      description: "fly beyond",
      imageUrl: "/images/goose.jpeg",
    },
    {
      name: "Hanson Organic",
      price: 26.99,
      quantity: 132,
      description: "family owner artisan distillers",
      imageUrl: "/images/hanson vodka.jpeg",
    },
    {
      name: "Ketel One",
      price: 28.99,
      quantity: 121,
      description: "drink marvelously",
      imageUrl: "/images/ketel one.jpeg",
    },
    {
      name: "Khor",
      price: 22.99,
      quantity: 45,
      description: "ultimate perfection",
      imageUrl: "/images/khor.jpeg",
    },
    {
      name: "Krakus",
      price: 27.99,
      quantity: 64,
      description: "exclusive",
      imageUrl: "/images/krakus.jpeg",
    },
    {
      name: "Mont Blanc",
      price: 22.99,
      quantity: 85,
      description: "Luxury has a new name",
      imageUrl: "/images/mont blanc.jpeg",
    },
    {
      name: "Ocean Organic",
      price: 34.99,
      quantity: 130,
      description: "Go beyond the bottle",
      imageUrl: "/images/ocean vodka.jpeg",
    },
    {
      name: "Reyka",
      price: 23.99,
      quantity: 75,
      description: "“Made with glacial spring water",
      imageUrl: "/images/reyka.jpeg",
    },
    {
      name: "Skyy",
      price: 19.99,
      quantity: 89,
      description: "a fresher tasting vodka",
      imageUrl: "/images/skyy.jpeg",
    },
    {
      name: "Svedka",
      price: 17.99,
      quantity: 90,
      description: "bring your own spirit",
      imageUrl: "/images/svedka.jpeg",
    },
    {
      name: "Tito's",
      price: 20.99,
      quantity: 145,
      description: "handmade",
      imageUrl: "/images/titos.jpeg",
    },
    {
      name: "Snow Leopard",
      price: 29.99,
      quantity: 72,
      description: "a spirit with a soul",
      imageUrl: "/images/snow leopard.jpeg",
    },
    {
      name: "Crater Lake",
      price: 19.99,
      quantity: 63,
      description: "the spirit of adventure",
      imageUrl: "/images/crater lake.jpeg",
    },
  ];
  async function createProducts() {
    for (let i = 0; i < products.length; i++) {
      await Product.create(products[i]);
    }
  }
  await createProducts();
  console.log(`seeded ${products.length} products`);

  //Creating Regions
  let regions = [
    {
      name: "United States",
    },
    {
      name: "France",
    },
    {
      name: "Sweden",
    },
    {
      name: "Poland",
    },
    {
      name: "Ukraine",
    },
    {
      name: "Iceland",
    },
    {
      name: "Netherlands",
    },
  ];
  async function setRegions() {
    for (let i = 0; i < regions.length; i++) {
      await Region.create(regions[i]);
    }
  }
  await setRegions();
  console.log(`seeded ${regions.length} regions`);

  // Creating Ingredients
  let ingredients = [
    {
      name: "Wheat",
    },
    {
      name: "Potato",
    },
    {
      name: "Grape",
    },
    {
      name: "Sugar Cane",
    },
    {
      name: "Wheat and Barley",
    },
    {
      name: "Corn",
    },
    {
      name: "Rye",
    },
    {
      name: "Spelt Grain",
    },
  ];
  async function createIngredients() {
    for (let i = 0; i < ingredients.length; i++) {
      await Ingredient.create(ingredients[i]);
    }
  }
  await createIngredients();
  console.log(`seeded ${ingredients.length} ingredients`);

  //Creating Orders
  let orders = [
    {
      orderDate: new Date(),
      shipAddress: "1234 21st pl se",
      shipState: "WA",
      shipCity: "Bellevue",
      shipPostalCode: "98004",
      fulfilled: false,
    },
    {
      orderDate: new Date(),
      shipAddress: "1235 21st pl se",
      shipState: "WA",
      shipCity: "Seattle",
      shipPostalCode: "98002",
      fulfilled: false,
    },
    {
      orderDate: new Date(),
      shipAddress: "1236 21st pl se",
      shipState: "CA",
      shipCity: "A false town",
      shipPostalCode: "90210",
      fulfilled: false,
    },
    {
      orderDate: new Date(),
      shipAddress: "1223 22nd st ne",
      shipState: "CA",
      shipCity: "Los Angeles",
      shipPostalCode: "90210",
      fulfilled: false,
    },
    {
      orderDate: new Date(),
      shipAddress: "1236 25th pl se",
      shipState: "WA",
      shipCity: "Redmond",
      shipPostalCode: "98052",
      fulfilled: false,
    },
  ];
  async function createOrders() {
    for (let i = 0; i < orders.length; i++) {
      await Order.create(orders[i]);
    }
  }
  await createOrders();
  console.log(`seeded ${orders.length} orders`);

  //add region and ingredients to product
  products = await Product.findAll({ order: [["id", "ASC"]] });
  orders = await Order.findAll({ order: [["id", "ASC"]] });
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
    through: { price: products[0].price, quantityOrdered: 3 },
  });
  await orders[0].addProduct(products[2], {
    through: { price: products[2].price, quantityOrdered: 1 },
  });
  await orders[1].setUser(2);
  await orders[1].addProduct(products[5], {
    through: { price: products[5].price, quantityOrdered: 2 },
  });
  await orders[1].addProduct(products[7], {
    through: { price: products[7].price, quantityOrdered: 4 },
  });
  await orders[2].setUser(3);
  await orders[2].addProduct(products[4], {
    through: { price: products[4].price, quantityOrdered: 1 },
  });
  await orders[2].addProduct(products[8], {
    through: { price: products[8].price, quantityOrdered: 5 },
  });

  await orders[3].setUser(4);
  await orders[3].addProduct(products[13], {
    through: {
      price: products[13].price,
      quantityOrdered: 4,
    },
  });
  await orders[3].addProduct(products[11], {
    through: {
      price: products[11].price,
      quantityOrdered: 1,
    },
  });
  await orders[4].setUser(5);
  await orders[4].addProduct(products[19], {
    through: { price: products[19].price, quantityOrdered: 9 },
  });
  await orders[4].addProduct(products[16], {
    through: { price: products[16].price, quantityOrdered: 6 },
  });
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
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
