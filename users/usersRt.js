const router = require("express").Router();
const userCt = require( "./usersCt")
const uploadPic = require("../helpers/handleStorage");

router.post(
    "/",
    uploadPic.single("profilePic"),
    userCt.createUser
  );

router.get("/", userCt.getAllUsers);
router.delete("/:id", userCt.deleteUserById);
router.put("/:id", userCt.updateUser );



module.exports = router