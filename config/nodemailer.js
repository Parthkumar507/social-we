// const nodemailer=require('nodemailer')
// const ejs=require('ejs')
// const path=require('path')
// const { dirname } = require('path')

// let transporter=new nodemailer.createTransport({
//     service:'gmail',
//     host:'smtp.gmail.com',
//     port:587,
//     secure:false,
//     auth:{
//         user:'fullfake112@gmail.com',
//         pass:'jwnjupvbsevkygpx'
//     }

// })

// let renderTemplate=(data,relativePath)=>{
//     let mailHTML;
//     ejs.renderFile(
//         path.join(dirname,'../views/mailers',relativePath),
//         data,
//         function(err,template){
//             if(err){consolr.log('error in rendering template',err);return;}

//             mailHTML=template;
//         }
        
//     )
//     return mailHTML;
// }

// module.exports={
//     transporter:transporter,
//     renderTemplate:renderTemplate
// }


const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')
const { dirname } = require('path')



let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user:'fullfake112@gmail.com',
        pass:'jwnjupvbsevkygpx'
    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template', err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}