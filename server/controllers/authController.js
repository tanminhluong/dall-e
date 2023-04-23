import User from "../models/User.js";
import generateToken from "../configs/generateToken.js";

const register = async (req, res) => {
  const { username, password, email, profileName } = req.body;

  if (!username || !password || !email || !profileName) {
    return res.status(401).json("Please enter all the fields");
  }
  const existedUser = await User.findOne({ username });
  if (existedUser) {
    return res.status(401).json("User already existed");
  }

  const newUser = new User({
    username,
    password,
    email,
    profileName,
  });

  try {
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(201).json({ ...others });
  } catch (error) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
      .populate("followers", "-password")
      .populate("followings", "-password");
    if (user && (await user.matchPassword(password))) {
      const { password, ...others } = user._doc;
      res.status(201).json({ ...others, token: generateToken(user._id) });
    } else {
      res.status(401).json("Wrong credentials");
    }

    // if (user && (await user.password) === password) {
    //   const { password, ...others } = user._doc;
    //   res.status(201).json({ ...others, token: generateToken(user._id) });
    // } else {
    //   res.status(401).json("Wrong credentials");
    // }
  } catch (error) {
    res.status(500).json(error);
  }
};

export { register, login };
