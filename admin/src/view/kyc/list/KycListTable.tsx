import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/deposit/depositSelectors';
import destroyActions from 'src/modules/deposit/destroy/depositDestroyActions';
import destroySelectors from 'src/modules/deposit/destroy/depositDestroySelectors';
import actions from 'src/modules/deposit/list/depositListActions';
import selectors from 'src/modules/deposit/list/depositListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import UserListItem from 'src/view/user/list/UserListItem';
import kycActions from 'src/modules/kyc/form/kycFormActions';
import  userFormAction  from 'src/modules/user/form/userFormActions';

function CouponsListTable(props) {
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
  const hasPermissionToEdit = useSelector(couponsSelectors.selectPermissionToEdit);
  const hasPermissionToDestroy = useSelector(couponsSelectors.selectPermissionToDestroy);

  const doOpenDestroyConfirmModal = (id) => setRecordIdToDestroy(id);
  const doCloseDestroyConfirmModal = () => setRecordIdToDestroy(null);

  const onSubmit = (id, values, user) => {
    const data = { 
      user: user,
      status: values
    };
    const value ={
      user:user,
      kyc: values ==="success"? true : false
    }
    
    dispatch(kycActions.doUpdate(id, data));
    dispatch(userFormAction.edituserkyc(value))
  };

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
                onClick={() => doChangeSort('title')}
              >
                {i18n('entities.kyc.fields.id')}
                {sorter.field === 'title' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('type')}
              >
                {i18n('entities.kyc.fields.useraccount')}
                {sorter.field === 'type' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('noOfTimes')}
              >
                {i18n('entities.kyc.fields.documenttype')}
                {sorter.field === 'noOfTimes' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('levelLimit')}
              >
                {i18n('entities.kyc.fields.realname')}
                {sorter.field === 'levelLimit' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('levelLimit')}
              >
                {i18n('entities.kyc.fields.idnumber')}
                {sorter.field === 'levelLimit' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('levelLimit')}
              >
                {i18n('entities.kyc.fields.frontofcertificate')}
                {sorter.field === 'levelLimit' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('levelLimit')}
              >
                {i18n('entities.kyc.fields.backofcertificate')}
                {sorter.field === 'levelLimit' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => doChangeSort('levelLimit')}
              >
                {i18n('entities.kyc.fields.status')}
                {sorter.field === 'levelLimit' && (
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
                <td colSpan={10} className="loading-cell">
                  <div className="loading-container">
                    <Spinner />
                    <span className="loading-text">Loading data...</span>
                  </div>
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={10} className="no-data-cell">
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
                  <td className="table-cell">{row.id}</td>
                  <td className="table-cell">
                    <UserListItem value={row.user} />
                  </td>
                  <td className="table-cell numeric">{row.Documenttype}</td>
                  <td className="table-cell numeric">{row.realname}</td>
                  <td className="table-cell numeric">{row.idnumer}</td>
                  <td className="table-cell">Front of Certificate</td>
                  <td className="table-cell">Back of Certificate</td>
                  <td className="table-cell">
                    {row.status === "pending" ? (
                      <div>
                        <button
                          className="btn-action edit"
                          onClick={() => onSubmit(row.id, 'success', row.user.id)}
                        >
                          Pass
                        </button>
                        <button
                          className="btn-action delete"
                          onClick={() => onSubmit(row.id, 'canceled', row.user.id)}
                        >
                          Rejection
                        </button>
                      </div>
                    ) : (
                      <span className={`status-badge ${row.status === "success" ? "success" : "canceled"}`}>
                        {row.status}
                      </span>
                    )}
                  </td>
                  <td className="actions-cell">
                    <div className="actions-container">
                      {hasPermissionToEdit && (
                        <Link className="btn-action edit" to={`/kyc/${row.id}/edit`}>
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

export default CouponsListTable;