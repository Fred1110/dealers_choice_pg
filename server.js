const { syncAndSeed, models: {Location} } = require ('./db');
const express = require('express');
const path = require('path');

const app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/location', async(req, res, next) => {
  try {
    res.send(await Location.findAll({
      attributes: {
        exclude: ['scotch']
      }
    }))
  } catch (error) {
    next(error)
  }
})

// app.get('/api/scotch', async(req, res, next) => {
//   try {
//     res.send(await Scotch.findAll({
//       attributes: {
//         exclude: ['detail']
//       }
//     }));
//   } catch (error) {
//     next(error)
//   }
// })

app.get('/api/location/:id', async(req, res, next) => {
  try {
    res.send(await Location.findByPk(req.params.id))
  } catch (error) {
    next(error)
  }
})

// app.get('/api/scotch/:id', async(req, res, next)=>{
//   try {
//     res.send(await Scotch.findByPk(req.params.id));
//   } catch (error) {
//     next(error)
//   }
// });

const init = async() => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
};

init();


// app.get('/', async(req, res, next) => {
//   try {
//     const response = await client.query('SELECT * FROM "Locations";');
//     const locations = response.rows;
//     res.send(`
//       <html>
//       <head>
//         <link rel='stylesheet' href='/assets/styles.css'/>
//       </head>
//       <body>
//       <h1>Scotch Whiskey Regions</h1>
//       <h2>Regions</h2>
//       <ul>
//         ${
//           locations.map( location =>`
//             <li>
//             <a href = '/locations/${location.id}'>
//             ${location.name}
//             </a>
//             </li>
//           `).join('')
//         }
//       </ul>
//       </body>
//       </html>
//     `)
//   } catch (error) {
//       next(error);
//   }
// });

// app.get('/locations/:id', async(req, res, next) => {
//   try {
//     const promises = [
//       client.query('SELECT * FROM "Locations" WHERE id=$1', [req.params.id]),
//       client.query('SELECT * FROM "Scotch" WHERE locations_id=$1', [req.params.id])
//     ];
//     const [locationsResponses,scotchsResponse] = await Promise.all(promises);
//     const locations = locationsResponses.rows[0];
//     const scotchs = scotchsResponse.rows;
//     res.send(`
//       <html>
//       <head>
//         <link rel='stylesheet' href='/assets/styles.css'/>
//       </head>
//       <body>
//       <h1>Scotch Whiskey Regions</h1>
//       <h2><a href = '/'>Regions</a>(${locations.name})</h2>
//       <ul>
//         ${
//           scotchs.map( scotch => `
//             <li>
//             <a href = '/scotchs/${scotch.id}'>
//             ${scotch.name}
//             </a>
//             </li>
//           `).join('')
//         }
//       </ul>
//       </body>
//       </html>
//     `)
//   } catch (error) {
//       next(error);
//   }
// });

// app.get('/scotchs/:id', async(req, res, next) => {
//   try {
//     const promises = [
//       client.query('SELECT * FROM "Locations" WHERE id=$1', [req.params.id]),
//       client.query('SELECT * FROM "Scotch" WHERE locations_id=$1', [req.params.id])
//     ];
//     const [locationsResponses,scotchsResponse] = await Promise.all(promises);
//     const locations = locationsResponses.rows[0];
//     const scotchs = scotchsResponse.rows;
//     res.send(`
//       <html>
//       <head>
//         <link rel='stylesheet' href='/assets/styles.css'/>
//       </head>
//       <body>
//       <ul>
//         ${
//           scotchs.map( scotch => `
//             <li>
//             <a href = '/scotchs/${scotch.id}'>
//             ${scotch.name}
//             </a>
//             </li>
//           `).join('')
//         }
//       </ul>
//       </body>
//       </html>
//     `)
//   } catch (error) {
//       next(error);
//   }
// });

// const port = process.env.PORT || 3000;


// const setUp = async() => {
//   try{
//     await client.connect();
//     await syncAndSeed();
//     console.log('connected to database');
//     app.listen(port, () => console.log (`listening on port ${port}`));
//   }
//   catch (ex){
//     console.log(ex);
//   }
// };

// setUp();

