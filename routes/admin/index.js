// ::INFO - ROUTE RENDER ADMIN SIDEN
// Dette route har til formål at rendere admin siden og hente antallet af produkter
// Kalder bl.a. funktionen authenticate - vil ikke kunne gå videre medmindre der retuneres true - funktionen vil derfor ikke blive udført
const authenticate = require('../../middleware/authenticate');
const kontakt = require('../../services/kontakt');

const cykel = require('../../services/cykel');
const bruger = require('../../services/bruger');

const images = require('../../services/image');

// Formidable handles form data (regular fields + uploaded files, but not resizing)
const formidable  = require ('formidable');

// Sharp handles image resizing.  Documentation: http://sharp.dimens.io/en/stable/
const sharp       = require ('sharp');


// const path = require('path'); // Bruges ved /billed_upload (uden resize)

module.exports = (app) => {
  app.get('/admin', authenticate, async (req, res, next) => {
    // console.log(req.session);

    try {
      let kontaktinfo = await kontakt.getOne(1);

      let cyklerne = await cykel.getAll_cykelAntal();
      let brugerne = await bruger.getAll_brugerAntal();
      let cykelAntal = cyklerne[ 0 ].antal;
      let brugerAntal = brugerne[ 0 ].antal;

      res.render('pages/admin/index', {
        siteTitle: 'CC',
        pageTitle: 'Adminpanel',
        kontakt: kontaktinfo,
        cykelAntal: cykelAntal,
        brugerAntal: brugerAntal
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });

  // KODE UDLEVERET OG GENNEMGÅET I UNDERVISNINGEN (EN DAG JEG IKKE VAR TILSTEDE)
  app.post('/billed_upload', async (req, res) => {
    try {

      // Enables/Disables debugging (only within this route)
      let debug = true;

      if (debug) console.log("\n------- DEBUG POST IMAGES START -------\n");

      // Timestamp example: 1537738117714  (Milliseconds since 1970. Used to generate unique image filenames)
      let timestamp = Date.now();

      let form = new formidable.IncomingForm();

      // Allows multiple files
      form.multiples = true;

      form.parse(req, function (err, fields, files) {

        // When using formidable, req.body is not directly available.
        // This copies the form data from formidable to req.body
        req.body = fields;
      });

      // Indbygget formidable eventhandler - parametret "end" igangsættes når req er modtaget og alle filer er overført.
      // Her indsættes response og redirect
      form.on("end", async () => {

        // ----------------------------------------------------------------
        // Image upload and resize

        let allFiles = form.openedFiles;

        let destinationFile = ""; // Do NOT change this here.
        let imageFolder = "public/images/billed_upload/";

        for (let i = 0; i < allFiles.length; i++) {
          let file = allFiles[ i ];

          let uniqueFilename = timestamp + '_' + file.name; // Example: 1537738117714_monkey.jpg
          // let uniqueFilename = `${timestamp}_${file.name}`; // Example: 1537738117714_monkey.jpg


          let sourceFile = file.path;  // Example: C:\Users\ChuckNorris\AppData\Local\Temp\upload_40536f848dded4c0c81e2401713bca4c

          if (debug) console.log("Unique Filename: ", uniqueFilename, "\n---");

          // Large Image
          destinationFile = imageFolder + "large/" + uniqueFilename;
          await sharp(sourceFile).resize(400, 300).max().toFile(destinationFile);

          // Small Image
          destinationFile = imageFolder + "small/" + uniqueFilename;
          await sharp(sourceFile).resize(80, 60).max().toFile(destinationFile);

          // Insert image into a separate table in the database
          if (debug) console.log("DB Insert image: ", uniqueFilename, "\n---");

          await images.insertImage(uniqueFilename);
        };
        if (debug) console.log("\n------- DEBUG POST IMAGES END -------\n");

        // ----------------------------------------------------------------

        res.redirect('/admin');
      });

    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });

  //  BILLED UPLOAD UDEN RESIZE
  // app.post('/billed_upload', (req, res) => {
  //   try {
  //     // grib det billede der er sendt med
  //     let billede = req.files.image;
  //     // console.log(billede);
  //     // tjek om billedet rent faktisk ER sendt med
  //     if (billede == undefined) {
  //       res.json({
  //         'status': 400,
  //         'error': 'Billedet blev ikke modtaget.'
  //       });
  //     } else {
  //       // Definer hvor billedet skal placeres, og hvilket navn det skal have
  //       let upload_location = path.join('public/images/billed_upload', billede.name);

  //       // Benyt den express-fileuplod funktionen mv() til at flytte billedet
  //       billede.mv(upload_location, (err) => {
  //         if (err) {
  //           console.log(err);
  //           res.send(err);
  //         }
  //         res.redirect('/admin');
  //       });
  //     }
  //   } catch (e) {
  //     res.send(`'Der skete en fejl: '${e.name}`);
  //     console.log(e.name);
  //   }
  // });
}