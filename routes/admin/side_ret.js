const authenticate = require('../../middleware/authenticate');
const kontakt = require('../../services/kontakt');

const side = require('../../services/side');

 module.exports = (app) => {
  app.get('/admin/side_ret/:id', authenticate, async (req, res) => {

    try {
      let kontaktinfo = await kontakt.getOne(1);

      let siden = await side.getOne(req.params.id);

       res.render('pages/admin/side_ret', {
        siteTitle: 'CC',
        pageTitle: 'Sideredigering',
        kontakt: kontaktinfo,
        side: siden
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });

  // Sender data til db
  app.post('/admin/side_ret/:id', async (req, res) => {
  
    try {
      
      await side.updateOne(req.params.id, req.body.afsnit1, req.body.afsnit2, req.body.afsnit3, req.body.afsnit4, req.body.afsnit5, req.body.forsidebillede);

      res.redirect('/admin/side_oversigt');
      
    }
    catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
} 