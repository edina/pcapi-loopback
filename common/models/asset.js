module.exports = function(Asset) {
	var DataSource = require('loopback-datasource-juggler').DataSource;
	var storageMongo = new DataSource({
		connector: require('loopback-component-storage-mongo'),
		host: 'localhost',
		port: 27017,
		database: 'fieldtripGB'
	});
	Asset.attachTo(storageMongo);
	Asset.findById = function(id,cb){
		cb(null,{status:'OK'});
		/*
		return Asset.db.collection('fs.files').findOne({
			'_id': id
		}, function(err,file){
			if(err)
				cb(err);
			if(!file){
				err = new Error('File not found');
				err.status = 404;
				cb(err);
			}
			cb(null,file);
		});
		*/
	};
	Asset.remoteMethod(
		'findById',{
			accepts:[{arg:'id',type:'string'}],
			returns: {arg: 'file', type:'object'},
			http: {path: '/:id/exists', verb: 'get'}
		}
	);
};