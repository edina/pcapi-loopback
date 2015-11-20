module.exports = function(Asset) {
	//REMOTE METHOD EXAMPLE
	Asset.fileSize = function(cb){
		var size = 100;
		cb(null,'The maximum filesize is: '+size+' MB');
	};
	Asset.remoteMethod(
		'fileSize',{
			accepts:[],
			returns: {arg: 'message', type: 'string'},
			http: {path: '/file-size', verb: 'get'}
		}
	);
	Asset.beforeRemote('fileSize',function(ctx,unused,next){
		console.log('Before executing the remote method fileSize');
		next();
	});
	Asset.afterRemote('fileSize',function(ctx,remoteMethodOuput,next){
		console.log('After executing the remote method fileSize');
		next();
	});
	//var Busboy = require('busboy');
	//var Grid = require('gridfs-stream');
	//var mongodb = require('mongodb');
	//var GridFS = mongodb.GridFS;
	//var ObjectID = mongodb.ObjectID;
	/*
	Asset.upload = function(req,res,cb){
		var busboy = new Busboy({headers: req.headers});
		busboy.on('file',function(fieldname,file,filename,encoding,mimetype){
			var options = {
						   filename: filename, 
						   metadata: {
         				   	mimetype: mimetype
        				   }
        				  };
        	//return upload2Mongo(file,options);
        	return cb(null,'success');
		});
		busboy.on('finish', function() {
      		console.log('Done parsing file!');
      		//cb(null,'upload successfully');
    	});
    	req.pipe(busboy);
	};
	Asset.remoteMethod(
		'upload',{
			accepts:[
				{arg: 'req', type: 'object', 'http': {source: 'req'}},
				{arg: 'res', type: 'object', 'http': {source: 'res'}}
			],
			returns: {arg: 'status' , type: 'string'},
			http: {path: '/upload', verb:'post'}
		}
	);
	function upload2Mongo(file, options, callback){
		var gfs, stream;
    	if (callback == null) {
      		callback = (function() {});
    	}
    	options._id = new ObjectID();
    	options.mode = 'w';
   		gfs = Grid(this.db, mongodb);
    	stream = gfs.createWriteStream(options);
    	stream.on('close', function(file) {
      		console.log(file);
      		return callback();
    	});
    	return file.pipe(stream);
	}*/
};

