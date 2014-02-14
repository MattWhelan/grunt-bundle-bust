var crypto = require('crypto'),
  fs = require('fs');

function getStreamHash(fin, cb){
  var sha = crypto.createHash("sha1");
  sha.setEncoding("hex");
  fin.pipe(sha);
  sha.on("readable", function(){
    cb(null, sha.read());
  });
}

function getFileHash(filepath, cb){
  return getStreamHash(fs.ReadStream(filepath), cb);
}

exports.getFileHash = getFileHash;

if(require.main === module){
  getFileHash(module.filename, function(err, hash){
    console.log(hash);
  });
}
