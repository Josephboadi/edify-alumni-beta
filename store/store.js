import { create } from "zustand";
import { createAlumniSlice } from "./slices/AlumniSlice";
import { createAuthSlice } from "./slices/AuthSlice";
import { createJobSlice } from "./slices/JobApplicationSlice";
import { createMenuSlice } from "./slices/MenuSlice";
import { createNewsSlice } from "./slices/NewsSlice";
import { createScholarshipSlice } from "./slices/ScholarshipApplicationSlice";
// import { createMenuSlice } from "./slices/MenuSlice";
// import { createdTransitionSlice } from "./slices/TransactionSlice";
// import { createTransferSlice } from "./slices/TransferSlice";
// import { createWalletSlice } from "./slices/WalletSlice";

export const useAppStore = create()((...a) => ({
  ...createAlumniSlice(...a),
  ...createAuthSlice(...a),
  ...createJobSlice(...a),
  ...createMenuSlice(...a),
  ...createNewsSlice(...a),
  ...createScholarshipSlice(...a),
  //   ...createdTransitionSlice(...a),
  //   ...createTransferSlice(...a),
  //   ...createWalletSlice(...a),
  //   ...createMenuSlice(...a),
}));
