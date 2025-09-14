import actions from 'src/modules/auth/authActions';
import assetsActions from 'src/modules/assets/list/assetsListActions';

// eslint-disable-next-line react-refresh/only-export-components
export default (store) => {
  store.dispatch(actions.doInit());
    store.dispatch(assetsActions.doFetch());
};
