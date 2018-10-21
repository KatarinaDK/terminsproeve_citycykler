const cykel = require('../../services/cykel');
const cykelFarve = require('../../services/cykelFarve');

const kontakt = require('../../services/kontakt');

const cykelType = require('../../services/cykelType');
const udstyrsKategori = require('../../services/udstyrsKategori');

module.exports = (app) => {
  app.get('/cykel/:id', async (req, res, next) => {
    // console.log(req.session);

    try {
      let cyklen = await cykel.getOne(req.params.id);
      let farverne = await cykelFarve.getAll(req.params.id);

      let kontaktinfo = await kontakt.getOne(1);
      let typen = await cykelType.getAll();
      let kategorien = await udstyrsKategori.getAll();

      let cykelTilbud = await cykel.get_tilbud();

      let render_data = {
        siteTitle: 'CC',
        pageTitle: 'Mere info',
        cykel: cyklen,
        farver: farverne,
        kontakt: kontaktinfo,
        tilbud: cykelTilbud,
        tilbudsmessage: '',
        menuTyper: typen,
        menuKategorier: kategorien
      }

      if (cykelTilbud.length <= 0) {
        render_data.tilbudsmessage = "Vi har desværre ingen varer på tilbud i øjeblikket.";
      }

      res.render('pages/site/cyklen', render_data);

    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}