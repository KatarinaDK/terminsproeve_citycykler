const authenticate = require('../../middleware/authenticate');
const kontakt = require('../../services/kontakt');

const cykel = require('../../services/cykel');

const type = require('../../services/cykelType');
const producent = require('../../services/producent');

module.exports = (app) => {
  app.get('/admin/cykel_ret/:id', authenticate, async (req, res) => {
    try {
      let cyklen = await cykel.getOne(req.params.id);

      let kontaktinfo = await kontakt.getOne(1);

      let cykeltype = await type.getAll();
      let cykelproducent = await producent.getAll();

      res.render('pages/admin/cykel_ret', {
        siteTitle: 'CC',
        pageTitle: 'Cykelredigering',
        kontakt: kontaktinfo,
        cykel: cyklen,
        typer: cykeltype,
        producenter: cykelproducent,
        message: ''
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });

  // Sender data til db
  // Som en ekstra sikkerhed valideres der inden data sendes afsted og i tilfælde af at clienside valideringen ikke virker
  app.post('/admin/cykel_ret/:id', async (req, res) => {
    try {
      
      
      // undersøg om der er indtastet et nyt navn og om det findes i et andet produkt
      let originalProdukt = await cykel.getOne(req.params.id);
      let originalProduktnavn = originalProdukt[ 0 ].model;
      let nytProduktnavn = req.body.model;
      
      let cyklerne = await cykel.getAll_cykelmodelAntal(nytProduktnavn);
      let nytprodukt = cyklerne[ 0 ].antal == 0;
      let model = nytprodukt ? nytProduktnavn : originalProduktnavn;
      
      if (nytprodukt || nytProduktnavn == originalProduktnavn) {
        await cykel.updateOne(
          req.params.id, 
          model, 
          req.body.beskrivelse, 
          req.body.producentnavn, 
          req.body.cykeltypenavn, 
          req.body.cykelbillede, 
          req.body.pris, 
          req.body.tilbudspris
        );
        // console.log('post: ' + req.body.tilbudspris);
        res.redirect('/admin/cykel_oversigt');
      }
      else {
        let kontaktinfo = await kontakt.getOne(1);

        let cykeltype = await type.getAll();
        let cykelproducent = await producent.getAll();

        res.render('pages/admin/cykel_ret', {
          siteTitle: 'CC',
          pageTitle: 'Cykelredigering',
          kontakt: kontaktinfo,
          cykel: originalProdukt,
          typer: cykeltype,
          producenter: cykelproducent,
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