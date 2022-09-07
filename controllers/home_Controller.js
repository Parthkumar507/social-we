module.exports.home=function(req,res){
    console.log(req.cookies)
    //cookie come as a req , but goes as a res
    // let x=req.cookies;
    res.cookie('user_id',1)
    return res.render('home',{
        titleName:'Home'
    })
}

