var Pack = require('../models/pack');

module.exports = {
  mainDisplay: function(req, res){
    if (!req.isAuthenticated()){
      return res.render('index.ejs');;
    }

    Pack.findOne({ 'user' :  req.user.local.email }, function(err, pack) {
      console.log('found pack', pack);
      res.render('home.ejs', {pack: pack.items});
    });
  }

}
