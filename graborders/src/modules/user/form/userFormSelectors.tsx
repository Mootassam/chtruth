import { createSelector } from "reselect";

const selectRaw = (state) => state.user.form;

const selectUser = createSelector([selectRaw], (raw) => raw.user);

const listMembers = createSelector([selectRaw], (raw) => raw.member);
const selectInitLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.initLoading)
);

const selectSaveLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.saveLoading)
);

const userFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectUser,
  listMembers,
  selectRaw,
};

export default userFormSelectors;
