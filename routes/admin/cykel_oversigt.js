const authenticate = require('../../middleware/authenticate');
const kontakt = require('../../services/kontakt');


const cykel = require('../../services/cykel');
const cykelfarve = require('../../services/cykelfarve');

 module.exports = (app) => {
  // RENDERING AF SIDEN
  app.get('/admin/cykel_oversigt', authenticate, async (req, res) => {
    // console.log(req.session);

    try {
      let cyklerne = await cykel.getAll_aktiveret();

      let kontaktinfo = await kontakt.getOne(1);

       res.render('pages/admin/cykel_oversigt', {
        siteTitle: 'CC',
        pageTitle: 'Cykeloversigt',
        kontakt: kontaktinfo,
        cykler: cyklerne
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
   // DEAKTIVER EN CYKEL OG GENINDLÆS SIDEN
  app.get('/admin/cykel_arkiver/:id', async (req, res) => {
    let cykelId = req.params.id;
     try {
      await cykel.updateOne_arkiver(cykelId);
      res.redirect('/admin/cykel_oversigt');
    }
    catch (e) {
      res.send('Der skete en fejl');
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    };
  });
   // SLET ET PRODUKT OG GENINDLÆS SIDEN
  app.get('/admin/cykel_slet/:id', async (req, res) => {
    let cykelId = req.params.id;
     try {
      await cykelfarve.delete(cykelId);
      await cykel.deleteOne(cykelId);
      res.redirect('/admin/cykel_oversigt');
    }
    catch (e) {
      res.send('Der skete en fejl');
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    };
  });
} 