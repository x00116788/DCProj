'use srict';
<<<<<<< HEAD
var year = new Date().getFullYear(),
    exp = year+1,
    month = new Date().getMonth();
    
module.exports = {
    
    issued: function(){
        var d = new Date(year,month+1);
        return d;
    },

    expires: function(){
        return new Date(exp,month+1);
=======
let moment = require('moment');

module.exports = {
    setDates: function(card_id){
        
>>>>>>> ac470dbbe0e21b3dfb98d4d6602cfc7d4acc6a33
    }

}