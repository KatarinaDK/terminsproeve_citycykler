const side = require('../../services/side');

const kontakt = require('../../services/kontakt');
const cykel = require('../../services/cykel');

const cykelType = require('../../services/cykelType');
const udstyrsKategori = require('../../services/udstyrsKategori');


module.exports = (app) => {
  app.get('/', async (req, res, next) => {
    // console.log(req.session);

    // try {
      let siden = await side.getOne(6);
      // console.log('siden: ' + siden);
      let kontaktinfo = await kontakt.getOne(1);
      let typen = await cykelType.getAll();
      let kategorien = await udstyrsKategori.getAll();

      let cykelTilbud = await cykel.get_tilbud();

      let render_data = {
          siteTitle: 'CC',
          pageTitle: 'Forsiden',
          side: siden,
          kontakt: kontaktinfo,
          tilbud: cykelTilbud,
          tilbudsmessage: '',
          menuTyper: typen,
          menuKategorier: kategorien
        }

        if (cykelTilbud.length <= 0) {
          render_data.tilbudsmessage = "Vi har desværre ingen varer på tilbud i øjeblikket.";
        }
  
        res.render('pages/site/index', render_data);

    // } catch (e) {
    //   res.send(`'Der skete en fejl: '${e.name}`);
    //   console.log(e.name);
    // }
  });
}