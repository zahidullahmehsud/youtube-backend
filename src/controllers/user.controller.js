import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    if (
      [username, fullName, email, password].some(
        (field) => field?.trim() == undefined || field?.trim() === ""
      )
    ) {
      return res.status(400).json({ error: "All field are required" });
    }

    // get existed user email or username on mongodb database
    const existedUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existedUser) {
      return res
        .status(400)
        .json({ error: "user with email and username already exist" });
    }
    const avatarPath = req.files?.avatar[0]?.path;
    var coverImagePath;

    if (req.files?.coverImage != undefined) {
      coverImagePath = req.files.coverImage[0].path;
    }
    if (!avatarPath) {
      return res.status(400).json({ error: "Avatar file required" });
    }
    const avatar = await uploadOnCloudinary(avatarPath);

    const coverImage = await uploadOnCloudinary(coverImagePath);

    const user = await User.create({
      username: username,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      fullName,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(200).json({
      message: "data are saved in database",
      response: createdUser,
    });
  } catch (error) {
    res.status(400).json({ error: error });
    console.log(error);
  }
};

export { registerUser };
