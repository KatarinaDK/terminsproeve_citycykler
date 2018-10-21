const cykel = require('../../services/cykel');

const kontakt = require('../../services/kontakt');

const cykelType = require('../../services/cykelType');
const udstyrsKategori = require('../../services/udstyrsKategori');

module.exports = (app) => {
  app.get('/cykler/type/:id', async (req, res, next) => {
    // console.log(req.session);

    try {
      

      let cykelTyper = await cykel.getAll_type(req.params.id);

      let kontaktinfo = await kontakt.getOne(1);

      let typen = await cykelType.getAll();
      let kategorien = await udstyrsKategori.getAll();

      let cykelTilbud = await cykel.get_tilbud();
      // let antalTilbud = cykelTilbud.tilbudspris;
      // console.log(cykelTilbud);


      let render_data = {
        siteTitle: 'CC',
        pageTitle: 'Cykeltype',
        cykler: cykelTyper,
        kontakt: kontaktinfo,
        tilbud: cykelTilbud,
        tilbudsmessage: '',
        menuTyper: typen,
        menuKategorier: kategorien
      }

      if (cykelTilbud.length <= 0) {
        render_data.tilbudsmessage = "Vi har desværre ingen varer på tilbud i øjeblikket.";
      }

      res.render('pages/site/cykeltype', render_data);

    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });

  // http://localhost:3002/cykler_paging/typen=3/limit=0/offset=3
  app.get('/cykler/type=:typen/limit=:limit/offset=:offset', async (req, res, next) => {
    
    try {
      let cykelTypen = await cykel.getAll_type(req.params.id);
  
  
      // console.log(parseInt(req.params.l));
      let cykler = await cykel.getPage(parseInt(req.params.typen), parseInt(req.params.limit), parseInt(req.params.offset));

res.send(cykler);
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}