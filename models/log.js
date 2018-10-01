var mongoose = require('mongoose');
var Schema = mongoose.Schema;

logSchema = new Schema({


	idDevice: mongoose.Schema.ObjectId,
	operation: String,
	devname: String,
	

}),
	Log = mongoose.model('Log', logSchema);

module.exports = Log;