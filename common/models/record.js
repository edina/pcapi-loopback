 module.exports = function(Record) {
	var app = require('../../server/server');
	Record.observe('before save',function(ctx,next){
		if(ctx.instance !== undefined){	//create(), findOrCreate() or prototype.save()
			var record = ctx.instance;
			var fields = record.properties.fields;
			var field = undefined;
			var finished = 0;
			for(var i=0;i<fields.length;i++){
				app.models.Field.create(fields[i],function(err,field){
					if(err !== null)
						next(err);	//error trying to create an instance of Field
					else{
						field.isValid(function(valid){
							if(valid){
								if(field.type === 'Audio' || field.type === 'Image'){
									//Search if exists any ObjectId asset with the value of the field.val
									app.models.Asset.existsId(field.val,function(err,file){
										if(err)	//any db error or file not found
											next(err);
										else
											setFinished();	//If error was not found, update the finished counter	
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
			function setFinished(){
				finished++;
				if(finished === fields.length)
					next();	//End of the validation before save
			}	
		}
	});
};
