var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

module.exports = {

    // Processes the entire form as a lumpsum
    processAllFieldsOfTheForm: function(req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            //Store the data from the fields in your data store.
            //The data store could be a file or database or any other store based
            //on your application.
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            res.write('received the data:\n\n');
            res.end(util.inspect({
                fields: fields,
                files: files
            }));
            console.log(res);
        });
    },

    // Processes all the fields of the form, can modify to include Errors, Files, and other parameters
    processFormFieldsIndividual: function(req, res) {
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
    //on your application.
    var fields = [];
    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        console.log(field);
        console.log(value);
        fields[field] = value;
    });

    // form.on('file', function (field, value)) {
    //     res.write("File: ");
    //     res.write(util.inspect(file));
    //     res.write("\n");
    // }

    form.on('end', function () {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields
        }));
    });
    form.parse(req);
    }

}