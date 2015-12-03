 'use strict';
 module.exports = function(Record) {
	var app = require('../../server/server');
	Record.observe('before save',function(ctx,next){
		if(ctx.instance !== undefined){	
			var record = ctx.instance;
			var fields = record.properties.fields;
			var field;
			var finished = 0;
			console.log('fields'+fields);
			for(var i=0;i<fields.length;i++){
				app.models.Field.create(fields[i],function(err,field){
					if(err !== null)
						next(err);	//error trying to create an instance of Field
					else{
						field.isValid(function(valid){
							if(valid){
								if(field.type === 'Audio' || field.type === 'Image'){
									/*Search if exists any ObjectId asset 
									with the value of the field.val*/
									app.models.Asset.existsId(field.val,function(err,file){
										if(err)//any db error or file not found
											next(err);
										else//If no error, update the finished counter
											setFinished();		
									});
								}
							}
							else{/*creates a ValidationError passing 
								the field instance failed after validating*/
								next(new ValidationError(field));
							}
						});
					}
				});
			}
		}
		else
			next();	//instance null
		function setFinished(){
			finished++;
			if(finished === fields.length)
				next();	//End of the validation before save
		}
	});
};