const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://raunakjha3208:raunakjha3208@cluster0.xwlh38u.mongodb.net/"
  )
  .then(() => console.log("database connected successfully"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

//create user model
const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
  try {
    //create a new document
    const newUser = await User.create({
      name: "Travis Doe",
      email: "travis@gmail.com",
      age: "55",
      isActive: true,
      tags: ["developer"],
    });
    // const newUser = new User({
    //   name: "John Doe",
    //   email: "johndoe1@gmail.com",
    //   age: "23",
    //   isActive: true,
    //   tags: ["developer"],
    // });
    await newUser.save();
    console.log("Created new user", newUser);
    // const allUsers = await User.find({});
    // console.log(allUsers);
    // const getUserOfActiveFalse = await User.find({ isActive: true });
    // console.log(getUserOfActiveFalse);
    // const getJohnDoeUser = await User.findOne({ name: "John Doe" });
    // console.log(getJohnDoeUser);
    // const getLastCreatedUserByUserId = await User.findById(newUser._id);
    // console.log(getLastCreatedUserByUserId, "getLastCreatedUserByUserId");
    // const selectedFields = await User.find().select("name email -_id");
    // console.log(selectedFields);
    // const limitedUsers = await User.find().limit(5).skip(1);
    // console.log(limitedUsers);
    // const sortedUsers = await User.find().sort({ age: 1 });
    // console.log(sortedUsers);

    // const countDocuments = await User.countDocuments({ isActive: true });
    // console.log(countDocuments);

    // const deletedUser = await User.findByIdAndDelete(newUser._id);
    // console.log("deleted user ->", deletedUser);

    // const updateUser = await User.findByIdAndUpdate(
    //   newUser._id,
    //   {
    //     $set: { age: 100 },
    //     $push: { tags: "updated" },
    //   },
    //   { new: true }
    // );
    // console.log("updated user", updateUser);
  } catch (e) {
    console.log("Error ->", e);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();
