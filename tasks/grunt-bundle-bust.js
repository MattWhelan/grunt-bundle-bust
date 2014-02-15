var hasher = require("./hasher"),
  async = require("async"),
  _ = require("lodash");

function composeResults(resultObj, cb){
  hasher.getObjectHash(resultObj, function(err, totalHash){
    var composed = {
      hash: totalHash,
      files: resultObj
    };

    cb(null, JSON.stringify(composed, null, 2));
  });
}

module.exports = function(grunt){
  grunt.registerMultiTask("bundleBust", "Cachebusting for static resource bundles", function(){
    var done = this.async();

    async.each(this.files, function(file, nextFile){
      var sources = file.src.filter(function(fn){
        return grunt.file.isFile(fn);
      });
      var result = {};
      async.each(sources, function(filename, next){
        hasher.getFileHash(filename, function(err, hash){
          if(err) next(err);
          result[filename] = hash;
          next();
        });
      }, function(){
        composeResults(result, function(err, resultStr){
          grunt.file.write(file.dest, resultStr);
          nextFile();
        });
      });
    }, done);
  });
};
