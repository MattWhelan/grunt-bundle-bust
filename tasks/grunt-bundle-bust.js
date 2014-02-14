var hasher = require("./hasher"),
  async = require("async");

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
        grunt.file.write(file.dest, JSON.stringify(result));
        nextFile();
      });
    }, done);
  });
};
