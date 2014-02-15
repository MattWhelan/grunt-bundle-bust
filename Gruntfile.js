module.exports = function(grunt){
  grunt.initConfig({
    bundleBust: {
      test: {
        options: {
          destProp: "manifest"
        },
        src: ["tasks/**"],
        dest: "test/testoutput.json",
      }
    },
    clean: ["test"]
  });

  grunt.loadTasks("tasks");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("test", "test bundleBust", function(){
    grunt.log.write("Testing").ok();
    this.requiresConfig("manifest");
    if(!grunt.config("manifest").hash){
      grunt.fail.fatal("manifest missing hash");
    }
    if(!grunt.file.isFile("test", "testoutput.json")){
      grunt.fail.fatal("didn't write output file");
    }
  });

  grunt.registerTask("default", ['bundleBust:test', 'test', 'clean']);
};
