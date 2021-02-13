const { client, syncAndSeed } = require ('./db');

const express = require('express');
const path = require('path');

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', async(req, res, next) => {
  try {
    const response = await client.query('SELECT * FROM "Locations"');
    const locations = response.rows;
    res.send(`
      <html>
      <head>
        <link rel='stylesheet' href='/assets/styles.css'/>
      </head>
      <body>
      <h1>Scotch Whiskey Regions</h1>
      <h2>Regions</h2>
      <ul>
        ${
          locations.map( location =>`
            <li>
            <a href = '/locations/${locations.id}'>
            ${location.name}
            </a>
            </li>
          `).join('')
        }
      </ul>
      </body>
      </html>
    `)
  } catch (error) {

  }
})

const port = process.env.PORT || 3000;


const setUp = async() => {
  try{
    await client.connect();
    await syncAndSeed();
    console.log('connected to database');
    app.listen(port, () => console.log (`listening on port ${port}`));
  }
  catch (ex){
    console.log(ex);
  }
};

setUp();

