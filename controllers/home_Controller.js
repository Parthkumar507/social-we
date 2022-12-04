const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({}).sort('-createdAt')
      .populate("user")
      .populate({
        path: "comments" ,
        options: { sort: { 'createdAt': -1 } },
        populate: {
          path: "user",
          select:'email , name'
        },
      })

    let users = await User.find({});

    return res.render("home", {
      titleName: "Home",
      posts: posts,
      all_users: users,
    });
  } catch(err){
    console.log('Error ', err)
  }
};
