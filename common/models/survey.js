module.exports = function(Survey) {
	var app = require('../../server/server');
	Survey.observe('before save',function(ctx,next){
		if(ctx.instance !== undefined){	//create(), findOrCreate() or prototype.save()
			var editor = ctx.instance;
			var inputs = editor.inputs;
			var finished = 0;
			var error = undefined;
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
					if(inputs[i].type !== undefined){	//types available 'Text','Range','TextArea','Audio','Check','Image','Option','Radio'
						if(inputs[i].type === 'Text')
							app.models.InputText.create(inputs[i],callbackCreate);
						else if(inputs[i].type === 'TextRange')
							app.models.inputRange.create(inputs[i],callbackCreate);
						else if(inputs[i].type === 'TextArea')
							app.models.inputTextArea.create(inputs[i],callbackCreate);
						else if(inputs[i].type === 'Audio')
							app.models.inputAudio.create(inputs[i],callbackCreate);
						else if(inputs[i].type === 'Check')
							app.models.inputCheck.create(inputs[i],callbackCreate);
						else if(inputs[i].type === 'Image')
							app.models.inputImage.create(inputs[i],callbackCreate);
						else if(inputs[i].type === 'Option')
							app.models.inputOption.create(inputs[i],callbackCreate);
						else if(inputs[i].type === 'Radio')
							app.models.inputRadio.create(inputs[i],callbackCreate);
						else{
							error = new Error('Element at position '+i+' does not have a valid value for type property');
							error.statusCode = 422;
							next(error);
						}
					}
					else{
						error = new Error('Element at position '+i+' does not have type property');
						error.statusCode = 400;
						next(error);
					}
				}
				function setFinished(){
					finished++;
					if(finished === inputs.length)
						next();	//End of the validation before save
					}
				}
				function callbackCreate(err,input){
					if(err !== null)
						next(err);
					else
						setFinished();
				}
		}
	});
};

//Investigate when client sends inputs as non-array because loopback tries to create an array before executing the before save observer
//If the inputs array is Input type the additional properties of Input are truncated