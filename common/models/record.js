var app = require('../../server/server'); 
module.exports = function(Record) {
	Record.observe('before save',function(ctx,next){
		if(ctx.instance !== undefined){	//create(), findOrCreate() or prototype.save()
			var record = ctx.instance;
			var fields = record.properties.fields;
			var field = undefined;
			for(var i=0;i<fields.length;i++){
				app.models.Field.create(fields[i],function(err,field){
					if(err !== null)
						next(err);	//error trying to create an instance of Field
					else{
						field.isValid(function(valid){
							if(valid){
								if(field.type === 'Audio' || field.type === 'Image'){
									//Search if exists any ObjectId asset with the value of the field.val
									app.models.Asset.findById(field.val,function(err,file){
										if(err)	//any db error or file not found
											next(err);	
									});
								}
							}
							else{	//Error validating the field instance
								next(new ValidationError(field));	//creates a ValidationError passing the field instance failed after validating
							}
						});
					}
				});
			}	
			next(); //Race conditions if any of the ObjectId for Asset does not exist...
		}
	});
};
