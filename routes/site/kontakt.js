const cykel = require('../../services/cykel');

const kontakt = require('../../services/kontakt');

const cykelType = require('../../services/cykelType');
const udstyrsKategori = require('../../services/udstyrsKategori');

module.exports = (app) => {
  app.get('/kontakt', async function (req, res) {
    // console.log(req.session);
    try {
      let kontaktinfo = await kontakt.getOne(1);

      let typen = await cykelType.getAll();
      let kategorien = await udstyrsKategori.getAll();

      let cykelTilbud = await cykel.get_tilbud();

      let render_data = {
        siteTitle: 'CC',
        pageTitle: 'Kontakt',
        kontakt: kontaktinfo,
        tilbud: cykelTilbud,
        tilbudsmessage: 'Vi har desværre ingen varer på tilbud i øjeblikket.',
        menuTyper: typen,
        menuKategorier: kategorien
      }

      if (cykelTilbud.length <= 0) {
        render_data.tilbudsmessage = "Vi har desværre ingen varer på tilbud i øjeblikket.";
      }

      res.render('pages/site/kontakt', render_data);
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}