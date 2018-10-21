const cykel = require('../../services/cykel');

const kontakt = require('../../services/kontakt');

const cykelType = require('../../services/cykelType');
const udstyrsKategori = require('../../services/udstyrsKategori');

module.exports = (app) => {
  app.get('/cykler/type=:typeId/offset=:offset', async (req, res, next) => {

    try {
      let kontaktinfo = await kontakt.getOne(1);
      let typen = await cykelType.getAll();
      let kategorien = await udstyrsKategori.getAll();
      let cykelTilbud = await cykel.get_tilbud();

      let typeId = parseInt(req.params.typeId);
      let limit = 3;

      // TÆLLER HVOR MANGE CYKLER DER FINDES AF DENNE TYPE
      let cykelAntal = await cykel.getAll_type(parseInt(typeId));


      // HENTER ALLE CYKLER AF EN BESTEMT TYPE (LIMIT ER SAT TIL 3 I LINKET FRA EJS/CYKLER)
      let cykler = await cykel.getPage_type(parseInt(typeId), parseInt(req.params.offset), limit);


      // DEFINERER HVOR MANGE CYKLER DER SKAL VISES PR SIDE OG HVOR MANGE PAGES DER SKAL GENERERES
      // RUNDER RESULTATET OP TIL NÆRMESTE HELTAL OG DEFINERER ANTALLET AF LINKS
      let linkAntal = Math.ceil(cykelAntal / limit);

      let render_data = {
        siteTitle: 'CC',
        pageTitle: 'Cykeltype',
        cykler: cykler,
        typeID: typeId,
        limit: limit,
        antalLink: linkAntal,
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
}