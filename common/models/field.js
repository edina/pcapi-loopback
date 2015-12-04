'use strict';
module.exports = function(Field) {
	Field.validatesInclusionOf('type',{in: ['Text','Range','TextArea',
											'Audio','Check','Image',
											'Option','Radio'], 
											message: 'Text, Range, '+
											'TextArea, Audio, Check, '+
											'Image, Option or Radio '+
											'are the valid types.'});
};
