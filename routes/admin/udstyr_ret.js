const authenticate = require('../../middleware/authenticate');
const kontakt = require('../../services/kontakt');

const udstyr = require('../../services/udstyr');

const kategori = require('../../services/udstyrsKategori');
const producent = require('../../services/producent');

module.exports = (app) => {
  app.get('/admin/udstyr_ret/:id', authenticate, async (req, res) => {
    try {
      let udstyret = await udstyr.getOne(req.params.id);

      let kontaktinfo = await kontakt.getOne(1);

      let udstyrskategori = await kategori.getAll();
      let udstyrproducent = await producent.getAll();

      res.render('pages/admin/udstyr_ret', {
        siteTitle: 'CC',
        pageTitle: 'Udstyrsredigering',
        kontakt: kontaktinfo,
        udstyr: udstyret,
        kategorier: udstyrskategori,
        producenter: udstyrproducent,
        message: ''
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });

  // Sender data til db
  // Som en ekstra sikkerhed valideres der inden data sendes afsted og i tilfælde af at clienside valideringen ikke virker
  app.post('/admin/udstyr_ret/:id', async (req, res) => {
    try {
      // Undersøg om der er indtastet et nyt navn og om det findes i et andet produkt

      let originalProdukt = await udstyr.getOne(req.params.id);
      let originalProduktnavn = originalProdukt[ 0 ].model;
      let nytProduktnavn = req.body.model;
      let udstyret = await udstyr.getAll_udstyrsmodelAntal(nytProduktnavn);
      let nytprodukt = udstyret[ 0 ].antal == 0;
      let model = nytprodukt ? nytProduktnavn : originalProduktnavn;
      
      if (nytprodukt || nytProduktnavn == originalProduktnavn) {
        await udstyr.updateOne(
          req.params.id,
          model,
          req.body.beskrivelse,
          req.body.producentnavn,
          req.body.udstyrskategorinavn,
          req.body.udstyrsbillede,
          req.body.pris
        );
        res.redirect('/admin/udstyr_oversigt');
      }
      else {
        let kontaktinfo = await kontakt.getOne(1);

        let udstyrskategori = await kategori.getAll();
        let udstyrsproducent = await producent.getAll();

        res.render('pages/admin/udstyr_ret', {
          siteTitle: 'CC',
          pageTitle: 'Udstyrsredigering',
          kontakt: kontaktinfo,
          udstyr: originalProdukt,
          kategorier: udstyrskategori,
          producenter: udstyrsproducent,
          message: 'Modelnavnet findes i forvejen',
          code: 1
        });
      }
    }
    catch (e) {
      res.send(e)
      console.log(e.name);
    }
  });
} 