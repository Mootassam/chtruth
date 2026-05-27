import depositService from 'src/modules/assets/assetsService';
import selectors from 'src/modules/assets/list/assetsListSelectors';
import Errors from 'src/modules/shared/error/errors';


const prefix = 'ASSESTS_LIST';

const assetsListActions = {

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  doClearAllSelected() {
    return {
      type: assetsListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: assetsListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: assetsListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: assetsListActions.RESETED,
    });

    dispatch(assetsListActions.doFetch());
  },



  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: assetsListActions.PAGINATION_CHANGED,
        payload: pagination,
      });
      dispatch(assetsListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: assetsListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(assetsListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        assetsListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = false) =>
    async (dispatch, getState) => {
      const CACHE_KEY = 'wallet:assets:v1';

      // Stale-while-revalidate: serve cached assets immediately so the wallet
      // renders without a loading spinner, then refresh in the background.
      let hasCachedData = false;
      try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (raw) {
          const cached = JSON.parse(raw);
          dispatch({
            type: assetsListActions.FETCH_SUCCESS,
            payload: { rows: cached.rows, count: cached.count },
          });
          hasCachedData = true;
        }
      } catch (_) {}

      if (!hasCachedData) {
        dispatch({
          type: assetsListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });
      }

      try {
        const response = await depositService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ rows: response.rows, count: response.count }));
        } catch (_) {}
        dispatch({
          type: assetsListActions.FETCH_SUCCESS,
          payload: { rows: response.rows, count: response.count },
        });
      } catch (error) {
        Errors.handle(error);
        if (!hasCachedData) {
          dispatch({ type: assetsListActions.FETCH_ERROR });
        }
      }
    },
};

export default assetsListActions;
