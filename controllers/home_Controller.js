module.exports.home=function(req,res){
    // return res.end('<h1>Express Server is up </h1>')
    return res.render('home',{
        titleName:'Home'
    })
}

