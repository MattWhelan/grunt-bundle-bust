module.exports = function(grunt){
  grunt.initConfig({
    bundleBust: {
      test: {
        src: ["tasks/**"],
        dest: "testoutput.json"
      }
    }
  });

  grunt.loadTasks("tasks");

  grunt.registerTask("default", ['bundleBust']);
};
