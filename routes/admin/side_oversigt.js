const authenticate = require('../../middleware/authenticate');
const kontakt = require('../../services/kontakt');

const side = require('../../services/side');

 module.exports = (app) => {
  // RENDERING AF SIDEN
  app.get('/admin/side_oversigt', authenticate, async (req, res) => {
    // console.log(req.session);

    try {
      let kontaktinfo = await kontakt.getOne(1);

      let siderne = await side.getAll();
       res.render('pages/admin/side_oversigt', {
        siteTitle: 'CC',
        pageTitle: 'Sideoversigt',
        kontakt: kontaktinfo,
        sider: siderne
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
} 