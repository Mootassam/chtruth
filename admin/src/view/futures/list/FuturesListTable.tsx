import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import futuresSelectors from 'src/modules/futures/futuresSelectors';
import destroyActions from 'src/modules/futures/destroy/futuresDestroyActions';
import destroySelectors from 'src/modules/futures/destroy/futuresDestroySelectors';
import actions from 'src/modules/futures/list/futuresListActions';
import selectors from 'src/modules/futures/list/futuresListSelectors';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import UserListItem from 'src/view/user/list/UserListItem';

function FuturesListTable() {
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
  const hasPermissionToEdit = useSelector(futuresSelectors.selectPermissionToEdit);
  const hasPermissionToDestroy = useSelector(futuresSelectors.selectPermissionToDestroy);

  const doOpenDestroyConfirmModal = (id) => setRecordIdToDestroy(id);
  const doCloseDestroyConfirmModal = () => setRecordIdToDestroy(null);

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'ascend' ? 'descend' : 'ascend';

    dispatch(actions.doChangeSort({ field, order }));
  };

  const doChangePagination = (pagination) => dispatch(actions.doChangePagination(pagination));
  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };
  const doToggleAllSelected = () => dispatch(actions.doToggleAllSelected());
  const doToggleOneSelected = (id) => dispatch(actions.doToggleOneSelected(id));

  return (
    <TableWrapper>
      <div className="table-responsive">
        <table className="table table-striped mt-2">
          <thead className="thead">
            <tr>
              <TableColumnHeader className="th-checkbox">
                {hasRows && (
                  <div className="adherent-control adherent-checkbox">
                    <input
                      type="checkbox"
                      id="table-header-checkbox"
                      className="adherent-control-input"
                      checked={Boolean(isAllSelected)}
                      onChange={doToggleAllSelected}
                    />
                    <label htmlFor="table-header-checkbox" className="adherent-control-label">
                      &#160;
                    </label>
                  </div>
                )}
              </TableColumnHeader>

              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name="futuresAmount"
                label={i18n('entities.futures.fields.futuresAmount')}
              />

              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name="contractDuration"
                label={i18n('entities.futures.fields.contractDuration')}
              />

              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name="futuresStatus"
                label={i18n('entities.futures.fields.status')}
              />

              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name="openPositionPrice"
                label={i18n('entities.futures.fields.openPositionPrice')}
              />

              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name="openPositionTime"
                label={i18n('entities.futures.fields.openPositionTime')}
              />

              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name="closePositionPrice"
                label={i18n('entities.futures.fields.closePositionPrice')}
              />

              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name="closePositionTime"
                label={i18n('entities.futures.fields.closePositionTime')}
              />

              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name="profitAndLossAmount"
                label={i18n('entities.futures.fields.profitAndLossAmount')}
              />

              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name="leverage"
                label={i18n('entities.futures.fields.leverage')}
              />

              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name="control"
                label={i18n('entities.futures.fields.control')}
              />

              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name="operate"
                label={i18n('entities.futures.fields.operate')}
              />

              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name="createdBy"
                label={i18n('entities.futures.fields.createdBy')}
              />

              <TableColumnHeader className="th-actions" />
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={100}>
                  <Spinner />
                </td>
              </tr>
            )}

            {!loading && !hasRows && (
              <tr>
                <td colSpan={100}>
                  <div className="d-flex justify-content-center">{i18n('table.noData')}</div>
                </td>
              </tr>
            )}

            {!loading &&
              rows.map((row) => (
                <tr key={row.id}>
                  <th className="th-checkbox" scope="row">
                    <div className="adherent-control adherent-checkbox">
                      <input
                        type="checkbox"
                        id={`table-header-checkbox-${row.id}`}
                        className="adherent-control-input"
                        checked={selectedKeys.includes(row.id)}
                        onChange={() => doToggleOneSelected(row.id)}
                      />
                      <label
                        htmlFor={`table-header-checkbox-${row.id}`}
                        className="adherent-control-label"
                      >
                        &#160;
                      </label>
                    </div>
                  </th>

                  <td>{row.futuresAmount}</td>
                  <td>{row.contractDuration}</td>
                  <td>{row.futuresStatus}</td>
                  <td>{row.openPositionPrice}</td>
                  <td>{row.openPositionTime}</td>
                  <td>{row.closePositionPrice}</td>
                  <td>{row.closePositionTime}</td>
                  <td>{row.profitAndLossAmount}</td>
                  <td>{row.leverage}</td>
                  <td>{row.control}</td>
                  <td>{row.operate}</td>
                  <td>
                    <UserListItem value={row.createdBy} />
                  </td>

                  <td className="td-actions">
                    {hasPermissionToEdit && (
                      <Link className="btn btn-link" to={`/futures/${row.id}/edit`}>
                        {i18n('common.edit')}
                      </Link>
                    )}
                    {hasPermissionToDestroy && (
                      <button
                        className="btn btn-link"
                        type="button"
                        onClick={() => doOpenDestroyConfirmModal(row.id)}
                      >
                        {i18n('common.destroy')}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination onChange={doChangePagination} disabled={loading} pagination={pagination} />

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={doCloseDestroyConfirmModal}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </TableWrapper>
  );
}

export default FuturesListTable;
