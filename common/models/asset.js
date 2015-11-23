module.exports = function(Asset) {
	var DataSource = require('loopback-datasource-juggler').DataSource;
	var storageMongo = new DataSource({
		connector: require('loopback-component-storage-mongo'),
		host: 'localhost',
		port: 27017,
		database: 'fieldtripGB'
	});
	Asset.attachTo(storageMongo);
	Asset.remoteMethod(
		'existsId',
		{
			accepts: {arg:'id',type:'string'},
			returns: {arg:'result', type:'boolean'},
			http: {verb: 'get', path: '/:id/exists'}
		}
	);
};