const cykel = require('../../services/cykel');

const kontakt = require('../../services/kontakt');

const cykelType = require('../../services/cykelType');
const udstyrsKategori = require('../../services/udstyrsKategori');
const producent = require('../../services/producent');

module.exports = (app) => {
  // app.get('/basicFind', async (req, res) => {
  app.get('/basicFind', async (req, res) => {
    // console.log(req.query.fritekst);

    try {

      let cykelFind = await cykel.basicFind(req.query.fritekst);
      let fritekst = req.query.fritekst;
      // console.log('find_value_basic: ' + fritekst);

      let kontaktinfo = await kontakt.getOne(1);

      let typen = await cykelType.getAll();
      let kategorien = await udstyrsKategori.getAll();
      let producenten = await producent.getAll();

      let cykelTilbud = await cykel.get_tilbud();

      let render_data = {
        siteTitle: 'CC',
        pageTitle: 'Avanceret søgning',
        fritekst_value: fritekst,
        cykler: cykelFind,
        kontakt: kontaktinfo,
        tilbud: cykelTilbud,
        tilbudsmessage: '',
        menuTyper: typen,
        menuKategorier: kategorien,
        typeOptions: typen,
        producentOptions: producenten
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

  app.get('/avanceretFind', async (req, res) => {

    try {


      let cykelFind = await cykel.avanceretFind(req.query.cykeltype, req.query.producent, req.query.pris, req.query.fritekst);

      let fritekst = req.query.fritekst;
      // console.log('find_value_advanced: ' + fritekst);

      let kontaktinfo = await kontakt.getOne(1);

      let typen = await cykelType.getAll();
      let kategorien = await udstyrsKategori.getAll();
      let producenten = await producent.getAll();

      let cykelTilbud = await cykel.get_tilbud();

      let render_data = {
        siteTitle: 'CC',
        pageTitle: 'Avanceret søgning',
        fritekst_value: fritekst,
        cykler: cykelFind,
        kontakt: kontaktinfo,
        tilbud: cykelTilbud,
        tilbudsmessage: '',
        menuTyper: typen,
        menuKategorier: kategorien,
        typeOptions: typen,
        producentOptions: producenten
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