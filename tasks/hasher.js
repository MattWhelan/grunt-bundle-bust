var crypto = require('crypto'),
  fs = require('fs'),
  _ = require("lodash");

function createHash(){
  var sha = crypto.createHash("sha1");
  sha.setEncoding("hex");
  return sha;
}

function getStreamHash(fin, cb){
  var sha = createHash();
  fin.pipe(sha);
  sha.on("readable", function(){
    cb(null, sha.read());
  });
}

function getFileHash(filepath, cb){
  return getStreamHash(fs.ReadStream(filepath), cb);
}

function getObjectHash(obj, cb){
  var sha = createHash();
  var chunks = _.reduce(obj, function(result, val, key){
    result.push(key);
    result.push(val);
    return result;
  }, []);

  sha.end(chunks.join(""), function(){
    cb(null, sha.read());
  });
}

exports.getFileHash = getFileHash;
exports.getObjectHash = getObjectHash;

if(require.main === module){
  getFileHash(module.filename, function(err, hash){
    console.log(hash);
  });
}
