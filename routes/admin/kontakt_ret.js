const authenticate = require('../../middleware/authenticate');

const kontakt = require('../../services/kontakt');

 module.exports = (app) => {
  app.get('/admin/kontakt_ret/:id', authenticate, async (req, res) => {
    
    try {
      let kontaktinfo = await kontakt.getOne(1);

       res.render('pages/admin/kontakt_ret', {
        siteTitle: 'CC',
        pageTitle: 'Kontaktredigering',
        kontakt: kontaktinfo,
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });

  // Sender data til db
  app.post('/admin/kontakt_ret/:id', async (req, res) => {
    try {
      
      await kontakt.updateOne(req.params.id, req.body.firmanavn, req.body.vejnavn, req.body.husnummer, req.body.postnummer, req.body.bynavn, req.body.telefon, req.body.fax, req.body.email);
      res.redirect('/admin');

    }
    catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
} 