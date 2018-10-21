const cykel = require('../../services/cykel');

const kontakt = require('../../services/kontakt');

const cykelType = require('../../services/cykelType');
const udstyrsKategori = require('../../services/udstyrsKategori');

module.exports = (app) => {
  app.get('/basicFind', async (req, res) => {
    // console.log(req.query.fritekst);

    try {

      let cykelFind = await cykel.basicFind(req.query.fritekst);

      let kontaktinfo = await kontakt.getOne(1);

      let typen = await cykelType.getAll();
      let kategorien = await udstyrsKategori.getAll();

      let cykelTilbud = await cykel.get_tilbud();

      // let antalTilbud = cykelTilbud.tilbudspris;
      // console.log(cykelTilbud);

      let render_data = {
        siteTitle: 'CC',
        pageTitle: 'Avanceret søgning',
        cykler: cykelFind,
        kontakt: kontaktinfo,
        tilbud: cykelTilbud,
        tilbudsmessage: '',
        menuTyper: typen,
        menuKategorier: kategorien
      }

      if (cykelTilbud.length <= 0) {
        render_data.tilbudsmessage = "Vi har desværre ingen varer på tilbud i øjeblikket.";
      }

      res.render('pages/site/avanceretFind', render_data);

    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}