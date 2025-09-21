import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import futuresSelectors from 'src/modules/futures/futuresSelectors';
import destroyActions from 'src/modules/futures/destroy/futuresDestroyActions';
import destroySelectors from 'src/modules/futures/destroy/futuresDestroySelectors';
import actions from 'src/modules/futures/list/futuresListActions';
import selectors from 'src/modules/futures/list/futuresListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import UserListItem from 'src/view/user/list/UserListItem';
import actionsForm from 'src/modules/futures/form/futuresFormActions';

function FuturesListTable() {
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );
  const hasPermissionToEdit = useSelector(
    futuresSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    futuresSelectors.selectPermissionToDestroy,
  );

  const doOpenDestroyConfirmModal = (id) =>
    setRecordIdToDestroy(id);
  const doCloseDestroyConfirmModal = () =>
    setRecordIdToDestroy(null);

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'ascend'
        ? 'descend'
        : 'ascend';
    dispatch(actions.doChangeSort({ field, order }));
  };

  const doChangePagination = (pagination) =>
    dispatch(actions.doChangePagination(pagination));
  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };
  const doToggleAllSelected = () =>
    dispatch(actions.doToggleAllSelected());
  const doToggleOneSelected = (id) =>
    dispatch(actions.doToggleOneSelected(id));

  const formSubmit = (id, e) => {
    let data = { control: e.target.value };
    dispatch(actionsForm.doUpdate(id, data));
  };

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
                onClick={() =>
                  doChangeSort('futuresAmount')
                }
              >
                {i18n(
                  'entities.futures.fields.futuresAmount',
                )}
                {sorter.field === 'futuresAmount' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() =>
                  doChangeSort('contractDuration')
                }
              >
                {i18n(
                  'entities.futures.fields.contractDuration',
                )}
                {sorter.field === 'contractDuration' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('status')}
              >
                {i18n('entities.futures.fields.status')}
                {sorter.field === 'status' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() =>
                  doChangeSort('openPositionPrice')
                }
              >
                {i18n(
                  'entities.futures.fields.openPositionPrice',
                )}
                {sorter.field === 'openPositionPrice' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() =>
                  doChangeSort('openPositionTime')
                }
              >
                {i18n(
                  'entities.futures.fields.openPositionTime',
                )}
                {sorter.field === 'openPositionTime' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() =>
                  doChangeSort('closePositionPrice')
                }
              >
                {i18n(
                  'entities.futures.fields.closePositionPrice',
                )}
                {sorter.field === 'closePositionPrice' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() =>
                  doChangeSort('closePositionTime')
                }
              >
                {i18n(
                  'entities.futures.fields.closePositionTime',
                )}
                {sorter.field === 'closePositionTime' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() =>
                  doChangeSort('profitAndLossAmount')
                }
              >
                {i18n(
                  'entities.futures.fields.profitAndLossAmount',
                )}
                {sorter.field === 'profitAndLossAmount' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('leverage')}
              >
                {i18n('entities.futures.fields.leverage')}
                {sorter.field === 'leverage' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th
                className="sortable-header"
                onClick={() => doChangeSort('control')}
              >
                {i18n('entities.futures.fields.control')}
                {sorter.field === 'control' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              {/* <th
                className="sortable-header"
                onClick={() => doChangeSort('operate')}
              >
                {i18n('entities.futures.fields.operate')}
                {sorter.field === 'operate' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th> */}
              <th
                className="sortable-header"
                onClick={() => doChangeSort('createdBy')}
              >
                {i18n('entities.futures.fields.createdBy')}
                {sorter.field === 'createdBy' && (
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
                <td colSpan={15} className="loading-cell">
                  <div className="loading-container">
                    <Spinner />
                    <span className="loading-text">
                      Loading data...
                    </span>
                  </div>
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={15} className="no-data-cell">
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
                        checked={selectedKeys.includes(
                          row.id,
                        )}
                        onChange={() =>
                          doToggleOneSelected(row.id)
                        }
                      />
                    </div>
                  </td>
                  <td className="table-cell numeric">
                    {row.futuresAmount}
                  </td>
                  <td className="table-cell">
                    {row.contractDuration}
                  </td>
                  <td className="table-cell">
                    <span className="status-badge">
                      {row.futuresStatus}
                    </span>
                  </td>
                  <td className="table-cell numeric">
                    {row.openPositionPrice}
                  </td>
                  <td className="table-cell">
                    {row.openPositionTime}
                  </td>
                  <td className="table-cell numeric">
                    {row.closePositionPrice}
                  </td>
                  <td className="table-cell">
                    {row.closePositionTime}
                  </td>
                  <td className="table-cell numeric">
                    {row.profitAndLossAmount}
                  </td>
                  <td className="table-cell numeric">
                    {row.leverage}
                  </td>
                  <td className="table-cell ">
               <div className="control-toggle">
  {['loss', 'profit'].map((status) => (
    <button
      key={status}
      type="button"
      className={`toggle-btn ${row.control === status ? 'active' : ''}`}
      onClick={() => formSubmit(row.id, { target: { value: status } })}
    >
      {status}
    </button>
  ))}
</div>

                  </td>
                  {/* <td className="table-cell">
                    {row.operate}
                  </td> */}
                  <td className="table-cell">
                    <UserListItem value={row.createdBy} />
                  </td>
                  <td className="actions-cell">
                    <div className="actions-container">
                      {hasPermissionToEdit && (
                        <Link
                          className="btn-action edit"
                          to={`/futures/${row.id}/edit`}
                        >
                          <i className="fas fa-edit"></i>
                          <span>{i18n('common.edit')}</span>
                        </Link>
                      )}
                      {hasPermissionToDestroy && (
                        <button
                          className="btn-action delete"
                          type="button"
                          onClick={() =>
                            doOpenDestroyConfirmModal(
                              row.id,
                            )
                          }
                        >
                          <i className="fas fa-trash"></i>
                          <span>
                            {i18n('common.destroy')}
                          </span>
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
        <Pagination
          onChange={doChangePagination}
          disabled={loading}
          pagination={pagination}
        />
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

export default FuturesListTable;
