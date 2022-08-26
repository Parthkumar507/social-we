module.exports.submit=function(req,res){
    // return res.render(require('../views/html/form.ejs'))
    return res.end(
        '<h1>Input</h1><form method="post" action="/form/submit/new"><input type="text" name="UseName" ><button type="submit">Submit</button></form>'
        )
}

module.exports.re=function(req,res){
    return res.redirect('back')
}