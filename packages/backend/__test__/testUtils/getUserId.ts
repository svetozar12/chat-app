import User from "../../src/models/User.model";

const getUserId = async (username: string) => {
  const user = await User.findOne({ username });
  return user ? user._id : null;
};

export default getUserId;
