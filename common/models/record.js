 'use strict';
 module.exports = function(Record) {
	var app = require('../../server/server');
	var ValidationError = require('loopback-datasource-juggler').ValidationError;
	Record.observe('before save',function(ctx,next){
		if(ctx.instance !== undefined){	
			var record = ctx.instance;
			var fields = record.properties.fields;
			var field;
			var finished = 0;
			for(var i=0;i<fields.length;i++)
				create(fields[i],finished,fields.length,next);
		}
		else
			next();	//instance null
	});
 	function create(field,n1,n2,callback){
 		app.models.Field.create(field,function(err,field){
					if(err !== null)
						callback(err);	//error trying to create an instance of Field
					else{
						field.isValid(function(valid){
							if(valid){
								if(field.type === 'Audio' || field.type === 'Image'){
									/*Search if exists any ObjectId asset
									with the value of the field.val*/
									app.models.Asset.existsId(field.val,function(err,file){
										if(err)//any db error or file not found
											callback(err);
										else{//If no error, update the finished counter
											n1++;
											isDone(n1,n2,callback);
										}		
									});
								}
								else{
									n1++;
									isDone(n1,n2,callback);
								}
							}
							else{/*creates a ValidationError passing 
								the field instance failed after validating*/
								callback(new ValidationError(field));
							}
						});
					}
				});
 	}
 	function isDone(n1,n2,callback){
 		if(n1 === n2) callback();
 	}
};