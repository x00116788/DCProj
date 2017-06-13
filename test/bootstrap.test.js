/**
 * Created by msomma on 15/01/2015.
 */
var Sails = require('sails'),
    fs = require('fs'),
    p = require('path'),
    clearTmp = require('../api/controllers/UploadController').clearTmp,
    sails;

// globals
global.defaultTimeout = 90000; // 1.5mins
global.mediumTimeout = 105000; // 1.75 mins
global.longTimeout = 120000; // 2 mins
global.dirRoot = p.join(__dirname, '../');
global.dirTmp = p.join(__dirname, '../tmp/_/');
global.dirTest = __dirname+'/';


before(function(done) {
    this.timeout(global.mediumTimeout);
    Sails.lift({
        // configuration for testing purposes
        environment : 'test',
        appName:"MOCHA Test App"
    }, function(err, server) {
        sails = server;
        if (err){
            console.log(err);
            return done(err);
        }
        // here you can load fixtures, etc.
        done(err, sails);
    });
});

after(function(done) {
    // removing temp csv files after tests
    var dir = p.join(__dirname, '../tmp/_');
    if (fs.existsSync(dir)){
        clearTmp(dir);
    }
    dir = p.join(__dirname, '../tmp');
    if (fs.existsSync(dir)){
        clearTmp(dir);
    }
    // lowering sails
    sails.lower(done);
});
