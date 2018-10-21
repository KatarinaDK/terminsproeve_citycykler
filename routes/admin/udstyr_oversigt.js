const authenticate = require('../../middleware/authenticate');
const kontakt = require('../../services/kontakt');


const udstyr = require('../../services/udstyr');

 module.exports = (app) => {
  // RENDERING AF SIDEN
  app.get('/admin/udstyr_oversigt', authenticate, async (req, res) => {
    // console.log(req.session);

    try {
      let udstyret = await udstyr.getAll_aktiveret();

      let kontaktinfo = await kontakt.getOne(1);

       res.render('pages/admin/udstyr_oversigt', {
        siteTitle: 'CC',
        pageTitle: 'Udstyrsoversigt',
        kontakt: kontaktinfo,
        udstyr: udstyret
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
   // DEAKTIVER ET STYKKE UDSTYR OG GENINDLÆS SIDEN
  app.get('/admin/udstyr_arkiver/:id', async (req, res) => {
    let udstyrsId = req.params.id;
     try {
      await udstyr.updateOne_arkiver(udstyrsId);
      res.redirect('/admin/udstyr_oversigt');
    }
    catch (e) {
      res.send('Der skete en fejl');
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    };
  });
   // SLET ET STYKKE UDSTYR OG GENINDLÆS SIDEN
  app.get('/admin/udstyr_slet/:id', async (req, res) => {
    let udstyrsId = req.params.id;
     try {
      await udstyr.deleteOne(udstyrsId);
      res.redirect('/admin/udstyr_oversigt');
    }
    catch (e) {
      res.send('Der skete en fejl');
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    };
  });
} 