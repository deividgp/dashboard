import express from 'express'

const app = express()

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'dist' })
})

app.get('/about.json', (req, res) => {
  const about = {
    client: {
      host: req.socket.remoteAddress
    },
    server: {
      current_time: Math.floor(Date.now() / 1000),
      services: [
        {
          name: 'weather',
          widgets: [
            {
              name: 'city_temperature',
              description: 'Display temperature for a city',
              params: [
                {
                  name: 'city',
                  type: 'string'
                }
              ]
            }
          ]
        },
        {
          name: 'rss',
          widgets: [
            {
              name: 'article_list',
              description: 'Displaying the list of the last articles',
              params: [
                {
                  name: ' link ',
                  type: ' string '
                },
                {
                  name: ' number ',
                  type: ' integer '
                }
              ]
            }
          ]
        }
      ]
    }
  }
  res.json(about)
})

app.listen(8080)
