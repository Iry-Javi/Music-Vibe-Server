
require("dotenv/config")
const mongoose = require("mongoose");
const Concert = require("../models/Concert.model"); 


mongoose

  .connect(process.env.MONGODB_URI)

  .then((x) => {

    console.log(

      `Connected to Mongo with initial data! Database name: "${x.connections[0].name}"`

    );

  })

  .catch((err) => {

    console.error("Error connecting to mongo: ", err);

  });
const concerts = [
    { title: 'Coldplay', 
     image: 'https://res.cloudinary.com/dawhur5qd/image/upload/v1675257749/music-vibe-app/kstrl1xlggvkudcu9azp.jpg', 
     description: 
     `Location: Olympic Stadium Lluis Companys. 
     Details:
     Dates: from 24/05/2023 to 28/05/2023
     Price: from €50,00 to €485,00 
     The doors open: 21:30
     Tour Name: Music of the Spheres World Tour
     For fans of Rock, Indie and Alternative, and Pop.`, 
     country: 'Spain' , 
     city: 'Barcelona', 
     street: 'Passeig Olímpic',
     houseNumber: '17-19',
     postalCode: '08038',
     owner: '63d286f4170680c8dfc8cd19'
   
    },


    { title: 'BlackPink', 
     image: 'https://res.cloudinary.com/dawhur5qd/image/upload/v1675184890/music-vibe-app/olsvbgnvyy3ihlxq5lzj.jpg', 
     description:      
     `Location: National Stadium Bukit Jalil. 
     Details:
     Dates: 04/03/2023
     Price: from €50,00 to €350,00 
     The doors open: 14:00. Please note the gates will be open approx. 60 minutes early for those customers who select Primary Entry and above.
     Tour Name: Music of the Spheres World Tour
     For fans of K-Pop.`, 
     country: 'Malasia' , 
     city: 'Kuala Lumpur', 
     street: 'Jalan barat Bukit Jalil',
     houseNumber: 'none',
     postalCode: '57000',
     owner: '63d286f4170680c8dfc8cd19'
   
     
    },


    { title: 'Harry Styles', 
     image: 'https://res.cloudinary.com/dawhur5qd/image/upload/v1675259696/music-vibe-app/tmuaag9zegewdtafad53.webp', 
     description:      
     `Location: Wembley Stadium. 
     Details:
     Dates: from 13/06/2023, 14/06/2023, 16/06/2023
     Price: from £46.25 to £399.00
     The doors open: 18:00
     Tour Name: Love On Tour
     For fans of Pop.`, 
     country: 'UK' , 
     city: 'London', 
     street: 'Wembley',
     houseNumber: '0WS',
     postalCode: 'HA9',
     owner: '63d286f4170680c8dfc8cd19'

    },


    { title: 'Rammstein', 
     image: 'https://res.cloudinary.com/dawhur5qd/image/upload/v1675260242/music-vibe-app/biz4wm7eucmdjpx0pfle.jpg', 
     description:      
     `Location: Olympiastadion. 
     Details:
     Dates: 1/07/2023, 16/07/2023, 18/07/2023
     Price: from €50,00 to €485,00 
     The doors open: 16:00
     Tour Name: Europe Stadium Tour 2023
     For fans of Electronic, Metal, and Rock.`, 
     country: 'Germany' , 
     city: 'Berlin', 
     street: 'Olympischer Platz',
     houseNumber: '3',
     postalCode: '14053',
     owner: '63d286f4170680c8dfc8cd19'
  
    },


    { title: 'Norah Jones', 
     image: 'https://res.cloudinary.com/dawhur5qd/image/upload/v1675261230/music-vibe-app/dtsubulhwpmifqqxbqfj.jpg', 
     description:      
     `Location: La Seine Musicale. 
     Details:
     Dates: from 06/07/2023
     Price: from €63,00 to €129,00 
     The doors open: 20:00
     For fans of Country, Jazz, and Folk y Blues.`, 
     country: 'France' , 
     city: 'Boulogne-Billancourt', 
     street: 'Cours de l-ile Seguin',
     houseNumber: '1',
     postalCode: '92100',
     owner: '63d286f4170680c8dfc8cd19'

    },
];

const concertsPromise = Concert.create(concerts);



Promise.all([concertsPromise])

  .then((result) => {

    const concertsCreated = result[0];

    console.log(`Number of events created... ${concertsCreated.length} `);



    // Once created, close the DB connection

    mongoose.connection.close();

  })

  .catch((e) => console.log("error seeding data in DB....", e));

// const MONGO_URI =
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/music-vibe-app-server";
// console.log(MONGO_URI)

// mongoose
//   .connect(MONGO_URI)
//   .then(x => {
//     console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
//     return Concert.create(concerts);
//   })

//   .then(concertsFromDB => {
//     console.log(`Created ${concertsFromDB.length}concerts`);
//     return mongoose.connection.close();
//   })
//   .then(() => {
//     console.log('DB connection closed!');
//   })
//   .catch(err => {
//     console.log(`An error occurred while creating recipes from the DB: ${err}`);
//     });