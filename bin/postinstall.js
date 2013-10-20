#!/usr/bin/env node
;(function () { // wrapper in case we're in module_context mode

    var fs = require('fs');

    var projectRoot = process.cwd()+"/../../";
    var configSource = process.cwd()+"/dce-config.js";
    var configDestination = projectRoot + "/dce-config.js";

    function copyFile(source, target, cb) {
        var cbCalled = false;

        var rd = fs.createReadStream(source);

        rd.on("error", function(err) {
            done(err);
        });

        var wr = fs.createWriteStream(target);
        wr.on("error", function(err) {
            done(err);
        });
        wr.on("close", function(ex) {
            done();
        });

        rd.pipe(wr);

        function done(err) {
            if (!cbCalled) {
                cb(err);
                cbCalled = true;
            }
        }
    }

    copyFile(configSource, configDestination, function(err){
        if(err)
        {
            console.log('Failed to copy ', configSource, ' to ', configDestination);
            throw err;
        }
    });

})();