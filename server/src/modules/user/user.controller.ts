import catchAsycn from "../../utils/catchAsycn";
import { userService } from "./user.service";

const createUserSocial = catchAsycn(async (req, res) => {
  const result = await userService.createUserSocial(req.body);
  res.cookie("token", result.refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "User create successfully",
    data: result,
  });
});

const getUser = catchAsycn(async (req, res) => {
  const result = await userService.getUser(req.user?.id);
  res.status(200).json({
    success: true,
    message: "User create successfully",
    data: result,
  });
});

export const userController = {
  createUserSocial,
  getUser,
};
