const authenticate = require('../../middleware/authenticate');
const kontakt = require('../../services/kontakt');

const udstyr = require('../../services/udstyr');

 module.exports = (app) => {
  // RENDERING AF SIDEN
  app.get('/admin/udstyr_aktiver', authenticate, async (req, res) => {
    // console.log(req.session);

    try {
      let udstyret = await udstyr.getAll_arkiveret();

      let kontaktinfo = await kontakt.getOne(1);

       res.render('pages/admin/udstyr_aktiver', {
        siteTitle: 'CC',
        pageTitle: 'Udstyrsaktivering',
        kontakt: kontaktinfo,
        udstyr: udstyret
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    } 
  });
   // AKTIVER ET STYKKE UDSTYR OG GENINDLÆSER SIDEN
  app.get('/admin/udstyr_aktiver/:id', async (req, res) => {
    let udstyrsId = req.params.id;
     try {
      await udstyr.updateOne_aktiver(udstyrsId);
      res.redirect('/admin/udstyr_oversigt');
    }
    catch (e) {
      res.send('Der skete en fejl');
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    };
  });
} 