import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import Permissions from "../../security/permissions";
import User from "../../database/models/user";
import Wallet from "../../database/models/wallet";
import Deposit from "../../database/models/deposit";
import Withdraw from "../../database/models/withdraw";
import Kyc from "../../database/models/kyc";
import Notification from "../../database/models/notification";
import Spot from "../../database/models/spot";
import Futures from "../../database/models/futures";
import Stacking from "../../database/models/stacking";

export default async (req, res) => {
  try {
    new PermissionChecker(req).validateHas(Permissions.values.userDestroy);

    const { userId } = req.params;
    const db = req.database;

    await Promise.all([
      Wallet(db).deleteMany({ user: userId }),
      Deposit(db).deleteMany({ user: userId }),
      Withdraw(db).deleteMany({ user: userId }),
      Kyc(db).deleteMany({ user: userId }),
      Notification(db).deleteMany({ user: userId }),
      Spot(db).deleteMany({ user: userId }),
      Futures(db).deleteMany({ user: userId }),
      Stacking(db).deleteMany({ user: userId }),
    ]);

    await User(db).deleteOne({ _id: userId });

    await ApiResponseHandler.success(req, res, true);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
