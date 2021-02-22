const cloudflareScraper = require('cloudflare-scraper');
const cheerio = require('cheerio');
const express = require('express')
const app = express()

app.get('/user_infos', (req,res) => {
  (async () => {
    try {
      const response = await cloudflareScraper.get('https://www4.yggtorrent.li/profile/' + req.query.user);
      const resp_html = cheerio.load(response);
      resp_html.html();
      const output = (cheerio.html(resp_html('.card-footer')));
      const infos = output.match(/[0-9]+[.]+[0-9]+[TGo]+/g);
      const user_infos= {upload: infos[0], download: infos[1]};
      console.log(JSON.stringify(user_infos));
      res.send(JSON.stringify(user_infos))
    } catch (error) {
      console.log(error);
      res.send(JSON.stringify({status: 300, error: "Can't not get user infos"}));
    }
  });
})

app.listen(8000, () => {
  console.log('Server listen on port 5000');
})

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(1);
});