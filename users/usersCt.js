const User = require("./usersMd")
const bc = require("../helpers/handlePass")
const public_url = process.env.public_url;


//get users
const getAllUsers = (req, res, next) => {
    // User.find()
    //   .then((data) => {
    //     !data.length ? next() : res.status(200).json(data);
    //   })
    //   .catch((error) => {
    //     error.status = 500;
    //     next(error);
    //   });
    // res.send("getUsers")
    User.find().then((data) => {
      !data.length 
      ? res.status(404).json({message: "not found"}) 
      : res.status(200).json(data);
      res.json(data)
    }).catch((error => console.log(error)))
  };

  //create user
  const createUser = async (req, res) => {

    const profilePic = `${public_url}/storage/${req.file.filename}`;
  
    
    const password = await bc.hashPassword(req.body.password);
  
 
    const newUser = new User({...req.body, profilePic, password});
    newUser.save((error, result) => {
      error
      ? res.status(400).json({ messsage: error.message})
      : res.status(200).json(result);
    })

};


  //update user
  const updateUser = async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true});
      res.status(200).json(user);

      // res.status(200).json({ message: "usuario con cambios", usuario: user });
    } catch (error) {
      res.status(404).json({ message: "Not found"});
    }
  };

//delete
//delete user by id
const deleteUserById = async (req, res, next) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ user: user.id, message: "Usuario borrado" });
    } catch (error) {
      next();
    }
    // res.send(`<h2>${req.params.id}<h2>`)
  };

module.exports = {getAllUsers, deleteUserById, createUser, updateUser};