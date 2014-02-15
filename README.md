Bundle Bust builds JSON manifests.
=================================

Use grunt-bundle-bust to hash each file in a directory, and then hash
the filepath:hash pairs.  The intent is that this provides fodder for a
cache-busting URL scheme.  You can either rename individual files, or
use a directory-level versioning scheme (particularly useful for
resource bundles combined using RequireJS or something similar).

Usage
----

bundleBust is a grunt multi-task.  Basic config looks like this.

    bundleBust: {
      multitaskName: {
        options: {
          destProp: "manifest" //The grunt.config property to write the
                               //manifest to.  Optional.
        },
        src: ["tasks/**"],     //The files to process.
        dest: "manifest.json", //The destination manifest file.
      }
    }

Output format
-----

The output format is the same for file output, or destination property
output.

    {
      hash: "sha1", //the hash for the entire bundle
      files: {
        "file/path": "sha1" //the hash for each individual file
      }
    }
