const authenticate = require('../../middleware/authenticate');
const kontakt = require('../../services/kontakt');

const udstyr = require('../../services/udstyr');

const kategori = require('../../services/udstyrsKategori');
const producent = require('../../services/producent');

module.exports = (app) => {
  app.get('/admin/udstyr_opret', authenticate, async (req, res) => {
    // console.log(req.session);

    try {
      let kontaktinfo = await kontakt.getOne(1);

      let udstyrskategori = await kategori.getAll();
      let udstyrsproducent = await producent.getAll();

      res.render('pages/admin/udstyr_opret', {
        siteTitle: 'CC',
        pageTitle: 'Udstyrsoprettelse',
        kontakt: kontaktinfo,
        kategorier: udstyrskategori,
        producenter: udstyrsproducent,
        message: ""
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });

  // Sender data til db
  // Som en ekstra sikkerhed valideres der inden data sendes afsted og i tilfælde af at clienside valideringen ikke virker
  app.post('/admin/udstyr_opret', async (req, res) => {
    try {

      let udstyret = await udstyr.getAll_udstyrsmodelAntal(req.body.model);
      let antal = udstyret[ 0 ].antal;
      
      // HVIS NAVNET ER UNIKT
      if (antal == 0) {
        await udstyr.createOne(req.body.model, req.body.beskrivelse, req.body.producentnavn, req.body.udstyrskategorinavn, req.body.udstyrsbillede, req.body.pris);
        res.redirect('/admin/udstyr_oversigt');
      }
      // HVIS NAVNET IKKE ER UNIKT
      else {
        // ::TODO - HER BURDE INDSÆTTES EN FETCH I STEDET, SÅ FELTERNE IKKE RYDDES
        let kontaktinfo = await kontakt.getOne(1);

        let udstyrskategori = await kategori.getAll();
        let udstyrsproducent = await producent.getAll();
  
        res.render('pages/admin/udstyr_opret', {
          siteTitle: 'CC',
          pageTitle: 'Udstyrsoprettelse',
          kontakt: kontaktinfo,
          kategorier: udstyrskategori,
          producenter: udstyrsproducent,
          message: "Modelnavnet findes i forvejen!"
        });
      }
    }
    catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
} 