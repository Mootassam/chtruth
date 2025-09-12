import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import assetsSelectors from 'src/modules/assets/assetsSelectors';
import destroyActions from 'src/modules/assets/destroy/assetsDestroyActions';
import destroySelectors from 'src/modules/assets/destroy/assetsDestroySelectors';
import actions from 'src/modules/assets/list/assetsListActions';
import selectors from 'src/modules/assets/list/assetsListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import UserListItem from 'src/view/user/list/UserListItem';

function AssetsListTable(props) {
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(destroySelectors.selectLoading);
  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const selectedKeys = useSelector(selectors.selectSelectedKeys);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(selectors.selectIsAllSelected);
  const hasPermissionToEdit = useSelector(assetsSelectors.selectPermissionToEdit);
  const hasPermissionToDestroy = useSelector(assetsSelectors.selectPermissionToDestroy);

  const doOpenDestroyConfirmModal = (id) => setRecordIdToDestroy(id);
  const doCloseDestroyConfirmModal = () => setRecordIdToDestroy(null);

  const doChangeSort = (field) => {
    const order = sorter.field === field && sorter.order === 'ascend' ? 'descend' : 'ascend';
    dispatch(actions.doChangeSort({ field, order }));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };

  const doToggleAllSelected = () => dispatch(actions.doToggleAllSelected());
  const doToggleOneSelected = (id) => dispatch(actions.doToggleOneSelected(id));

  return (
    <div className="spot-list-container">
      <div className="table-responsive">
        <table className="spot-list-table">
          <thead className="table-header">
            <tr>
              <th className="checkbox-column">
                {hasRows && (
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={Boolean(isAllSelected)}
                      onChange={doToggleAllSelected}
                    />
                  </div>
                )}
              </th>
          
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('user')}
              >
                {i18n('entities.assets.fields.user')}
                {sorter.field === 'user' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('symbol')}
              >
                {i18n('entities.assets.fields.symbol')}
                {sorter.field === 'symbol' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('coinName')}
              >
                {i18n('entities.assets.fields.coinName')}
                {sorter.field === 'coinName' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('amount')}
              >
                {i18n('entities.assets.fields.amount')}
                {sorter.field === 'amount' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('status')}
              >
                {i18n('entities.assets.fields.status')}
                {sorter.field === 'status' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {loading && (
              <tr>
                <td colSpan={8} className="loading-cell">
                  <div className="loading-container">
                    <Spinner />
                    <span className="loading-text">Loading data...</span>
                  </div>
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={8} className="no-data-cell">
                  <div className="no-data-content">
                    <i className="fas fa-database no-data-icon"></i>
                    <p>{i18n('table.noData')}</p>
                  </div>
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((row) => (
                <tr key={row.id} className="table-row">
                  <td className="checkbox-column">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedKeys.includes(row.id)}
                        onChange={() => doToggleOneSelected(row.id)}
                      />
                    </div>
                  </td>
 
                  <td className="table-cell">
                    <UserListItem value={row.createdBy} />
                  </td>
                  <td className="table-cell">{row.symbol}</td>
                  <td className="table-cell">{row.coinName}</td>
                  <td className="table-cell numeric">{row.amount}</td>
                  <td className="table-cell">
                    <span className={`status-badge ${(row.status === 'success' || row.status === 'available') ? 'success' : 'canceled'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <div className="actions-container">
                      {hasPermissionToEdit && (
                        <Link className="btn-action edit" to={`/assets/${row.id}/edit`}>
                          <i className="fas fa-edit"></i>
                          <span>{i18n('common.edit')}</span>
                        </Link>
                      )}
                      {hasPermissionToDestroy && (
                        <button 
                          className="btn-action delete" 
                          type="button" 
                          onClick={() => doOpenDestroyConfirmModal(row.id)}
                        >
                          <i className="fas fa-trash"></i>
                          <span>{i18n('common.destroy')}</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <Pagination onChange={doChangePagination} disabled={loading} pagination={pagination} />
      </div>

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={doCloseDestroyConfirmModal}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </div>
  );
}

export default AssetsListTable;