var mongoose = require('mongoose');
var Schema = mongoose.Schema;

deviceSchema = new Schema( {
	
	unique_id: Number,
	ip : String,
	mac : String,
	devname: String,
	type: String,
	status : String,
	info : {}

}),
Device = mongoose.model('Device', deviceSchema);

module.exports = Device;