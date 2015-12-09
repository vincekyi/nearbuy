var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var mmm = require('mmmagic'),
      Magic = mmm.Magic;

module.exports = {

    // // Processes the entire form as a lumpsum
    // processAllFieldsOfTheForm: function(req, res) {
    //     var form = new formidable.IncomingForm();
    //     form.parse(req, function (err, fields, files) {
    //         //Store the data from the fields in your data store.
    //         //The data store could be a file or database or any other store based
    //         //on your application.
    //         res.writeHead(200, {
    //             'content-type': 'text/plain'
    //         });
    //         res.write('received the data:\n\n');
    //         res.end(util.inspect({
    //             fields: fields,
    //             files: files
    //         }));
    //         console.log(res);
    //     });
    // },

    // Processes all the fields of the form, can modify to include Errors, Files, and other parameters
    processFormFieldsIndividual: function(req, res) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        var fields = [];
        var files = [];
        var form = new formidable.IncomingForm();

        // Text Field
        form.on('field', function (field, value) {
            fields[field] = value;
        });

        // File Uploads
        form.on('file', function (name, file) {
            var magic = new Magic(mmm.MAGIC_MIME);
            var valid = false;

            magic.detectFile(file.path, function(err, result) {
              if (err) throw err;

              // If image is an accepted file type e.g. jpeg or png
              if(result.indexOf("jpeg") > -1 || result.indexOf("png") > -1){
                valid = true;
                // files[file.name] = file.type;
              }
              console.log("IMAGE VALID: " + valid);
              
            });
        });

        // Used to create progress bar progression
        form.on('progress', function(bytesReceived, bytesExpected) {
            console.log( (bytesReceived / bytesExpected) * 100 + " % DONE");
        });

        // Called once all text fields values are pulled
        form.on('end', function () {
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            res.write('received the data:\n\n');
            res.end(util.inspect({
                 fields: fields,
            }));

        });

        form.parse(req);
    }

}