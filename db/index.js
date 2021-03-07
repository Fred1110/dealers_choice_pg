const Sequelize = require('sequelize');
const { STRING, TEXT } = Sequelize;
const faker = require('faker')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/scotch_db')


const Location = conn.define('location', {
  name: STRING,
  scotch: TEXT
}, {
  hooks:{
    beforeCreate: function(location){
      if(!location.scotch){
        location.scotch = `${location.name}. ${faker.lorem.paragraph(1)}. ${location.name}`
      }
    }
  }
});

// const Scotch = conn.define('scotch', {
//   name: TEXT
// }, {
//   hooks:{
//     beforeCreate: function(scotch){
//       if(!scotch.name){
//         scotch.name = `${scotch.name}`
//       }
//     }
//   }
// })

// Scotch.createWithName = (name)=> Scotch.create({name});
Location.createWithName = (name) => Location.create({name});



const syncAndSeed = async() => {
  await conn.sync({force:true});
  // const [The_Dalmore, Glenmorangie, Auchentoshan, Daftmill, The_Macallan, The_Balvenie, The_Glenlivet, Glenfiddich, Glenscotia, Bowmore] = await Promise.all(
  //   ['The_Dalmore', 'Glenmorangie', 'Auchentoshan', 'Daftmill', 'The_Macallan', 'The_Balvenie', 'The_Glenlivet', 'Glenfiddich', 'Glenscotia', 'Bowmore'].map(Scotch.createWithName)
  // );
  const [Highland, Lowland, Speyside, Campbeltown, Islay] = await Promise.all(
    ['Highland', 'Lowland', 'Speyside', 'Campbeltown', 'Islay'].map(Location.createWithName)
  );
}

module.exports = {
  models: {
    Location
  },
  syncAndSeed
}




// const pg = require('pg');

// const client = new pg.Client('postgres://localhost/scotch_db');
// const syncAndSeed = async() => {
//   const SQL = `
//   DROP TABLE IF EXISTS "Scotch";
//   DROP TABLE IF EXISTS "Locations";
//   CREATE TABLE "Locations"(
//     id INTEGER PRIMARY KEY,
//     name VARCHAR(100) NOT NULL
//   );
//   CREATE TABLE "Scotch"(
//     id INTEGER PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     locations_id INTEGER REFERENCES "Locations"(id)
//   );
//   INSERT INTO "Locations"(id, name) VALUES(1, 'Highland');
//   INSERT INTO "Locations"(id, name) VALUES(2, 'Lowland');
//   INSERT INTO "Locations"(id, name) VALUES(3, 'Speyside');
//   INSERT INTO "Locations"(id, name) VALUES(4, 'Campbeltown');
//   INSERT INTO "Locations"(id, name) VALUES(5, 'Islay');
//   INSERT INTO "Scotch"(id, name, locations_id) VALUES(1, 'The Dalmore', 1);
//   INSERT INTO "Scotch"(id, name, locations_id) VALUES(2, 'Glenmorangie', 1);
//   INSERT INTO "Scotch"(id, name, locations_id) VALUES(3, 'Auchentoshan', 2);
//   INSERT INTO "Scotch"(id, name, locations_id) VALUES(4, 'Daftmill', 2);
//   INSERT INTO "Scotch"(id, name, locations_id) VALUES(5, 'The Macallan', 3);
//   INSERT INTO "Scotch"(id, name, locations_id) VALUES(6, 'The Balvenie', 3);
//   INSERT INTO "Scotch"(id, name, locations_id) VALUES(7, 'The Glenlivet', 3);
//   INSERT INTO "Scotch"(id, name, locations_id) VALUES(8, 'Glenfiddich', 3);
//   INSERT INTO "Scotch"(id, name, locations_id) VALUES(9, 'Glenscotia', 4);
//   INSERT INTO "Scotch"(id, name, locations_id) VALUES(10, 'Bowmore', 5);
//   `
//   await client.query(SQL);
// }

// module.exports = {
//   client,
//   syncAndSeed
// };
