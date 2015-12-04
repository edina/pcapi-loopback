'use strict';
module.exports = function(Survey) {
	var app = require('../../server/server');
	Survey.observe('before save',function(ctx,next){
		if(ctx.instance !== undefined){
			var editor = ctx.instance;
			var inputs = editor.inputs;
			var finished = 0;
			var error;
			if(inputs === undefined){
				error = new Error('Property inputs is required');
				error.statusCode = 400;
				next(error);
			}
			else{
				if(inputs.length === 0){
					error = new Error('Property inputs is an empty list');
					error.statusCode = 400;
					next(error);	
				}
				for(var i=0;i<inputs.length;i++){
					if(inputs[i].type !== undefined)
						create(inputs[i],finished,inputs.length,next);
					else{
						error = new Error('Element at position '+i+' does not have '+
						'type property');
						error.statusCode = 400;
						next(error);
					}
				}
			}
		}
		else
			next();
	});
	function create(input,n1,n2,callback){
		if(input.type === 'Text')
			app.models.InputText.create(input,
			function(err,input){callbackCreate(err,input,n1,n2,callback);});
		else if(input.type === 'TextRange')
			app.models.InputRange.create(input,
			function(err,input){callbackCreate(err,input,n1,n2,callback);});
		else if(input.type === 'TextArea')
			app.models.InputTextArea.create(input,
			function(err,input){callbackCreate(err,input,n1,n2,callback);});
		else if(input.type === 'Audio')
			app.models.InputAudio.create(input,
			function(err,input){callbackCreate(err,input,n1,n2,callback);});
		else if(input.type === 'Check')
			app.models.InputCheck.create(input,
			function(err,input){callbackCreate(err,input,n1,n2,callback);});
		else if(input.type === 'Image')
			app.models.InputImage.create(input,
			function(err,input){callbackCreate(err,input,n1,n2,callback);});
		else if(input.type === 'Option')
			app.models.InputOption.create(input,
			function(err,input){callbackCreate(err,input,n1,n2,callback);});
		else if(input.type === 'Radio')
			app.models.InputRadio.create(input,
			function(err,input){callbackCreate(err,input,n1,n2,callback);});
		else{
			var error = new Error('At least one input does not have '+
			'a valid value for type property');
			error.statusCode = 422;
			callback(error);
		}
	}
	function callbackCreate(err,input,n1,n2,callback){
			if(err !== null)
				callback(err);
			else{
				n1++;
				isDone(n1,n2,callback);
			}
	}
	function isDone(n1,n2,callback){
 		if(n1 === n2) callback();
 	}
};
/*
1. Investigate when client sends inputs as non-array because loopback 
tries to create an array before executing the before save observer
2. If the inputs array is Input type the additional properties of 
Input are truncated
*/