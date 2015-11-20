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
	Asset.remoteMethod(
		'findById',{
			accepts:[{arg:'id',type:'string'}],
			returns: {arg: 'file', type:'object'},
			http: {path: '/:id/exists', verb: 'get'}
		}
	);
};

