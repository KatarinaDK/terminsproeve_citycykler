const authenticate = require('../../middleware/authenticate');
const kontakt = require('../../services/kontakt');

const cykel = require('../../services/cykel');

const type = require('../../services/cykelType');
const farve = require('../../services/cykelFarve');
const producent = require('../../services/producent');

module.exports = (app) => {
  app.get('/admin/cykel_opret', authenticate, async (req, res) => {
    // console.log(req.session);

    try {
      let kontaktinfo = await kontakt.getOne(1);

      let cykeltype = await type.getAll();
      let cykelfarve = await farve.getAll_navn();
      let cykelproducent = await producent.getAll();

      res.render('pages/admin/cykel_opret', {
        siteTitle: 'CC',
        pageTitle: 'Cykeloprettelse',
        kontakt: kontaktinfo,
        typer: cykeltype,
        farver: cykelfarve,
        producenter: cykelproducent,
        message: ""
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });

  // Sender data til db
  // Som en ekstra sikkerhed valideres der inden data sendes afsted og i tilfælde af at clienside valideringen ikke virker
  app.post('/admin/cykel_opret', async (req, res) => {
    try {

      const cyklerne = await cykel.getAll_cykelmodelAntal(req.body.model);
      let antal = cyklerne[ 0 ].antal;
      
      // HVIS NAVNET ER UNIKT
      if (antal == 0) {
        await cykel.createOne(req.body.model, req.body.beskrivelse, req.body.producentnavn, req.body.cykeltypenavn, req.body.cykelbillede, req.body.pris, req.body.tilbudspris);
        res.redirect('/admin/cykel_oversigt');
      }
      // HVIS NAVNET IKKE ER UNIKT
      else {
        // ::TODO - HER BURDE INDSÆTTES EN FETCH I STEDET, SÅ FELTERNE IKKE RYDDES
        let kontaktinfo = await kontakt.getOne(1);

        const cykeltype = await type.getAll();
        const cykelproducent = await producent.getAll();

        res.render('pages/admin/cykel_opret', {
          siteTitle: 'CC',
          pageTitle: 'Cykeloprettelse',
          kontakt: kontaktinfo,
          typer: cykeltype,
          farver: cykelfarve,
          producenter: cykelproducent,
          message: "Modelnavnet findes i forvejen"
        });
      }
    }
    catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
} 