const authenticate = require('../../middleware/authenticate');
const kontakt = require('../../services/kontakt');

const cykel = require('../../services/cykel');

 module.exports = (app) => {
  // RENDERING AF SIDEN
  app.get('/admin/cykel_aktiver', authenticate, async (req, res) => {
    // console.log(req.session);

    try {
      let cyklerne = await cykel.getAll_arkiveret();

      let kontaktinfo = await kontakt.getOne(1);

       res.render('pages/admin/cykel_aktiver', {
        siteTitle: 'CC',
        pageTitle: 'Cykelaktivering',
        kontakt: kontaktinfo,
        cykler: cyklerne
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    } 
  });
   // AKTIVER EN CYKEL OG GENINDLÆSER SIDEN
  app.get('/admin/cykel_aktiver/:id', async (req, res) => {
    const cykelId = req.params.id;
     try {
      await cykel.updateOne_aktiver(cykelId);
      res.redirect('/admin/cykel_aktiver');
    }
    catch (e) {
      res.send('Der skete en fejl');
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    };
  });
} 