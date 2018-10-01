






var mongoose = require('mongoose');
var Schema = mongoose.Schema;


elementSchema = Schema({
        x: Number,
        y: Number,
        name: String,
        type: String,
        idDevice : mongoose.Schema.ObjectId,
        state: String,
        functions: []

})


dashboardSchema = new Schema({

        dashboardName: String,

        objects: [elementSchema],
        image :String


}),
        Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;