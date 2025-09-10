import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/withdraw/withdrawSelectors';
import destroyActions from 'src/modules/withdraw/destroy/withdrawDestroyActions';
import destroySelectors from 'src/modules/withdraw/destroy/withdrawDestroySelectors';
import actions from 'src/modules/withdraw/list/withdrawListActions';
import selectors from 'src/modules/withdraw/list/withdrawListSelectors';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import UserListItem from 'src/view/user/list/UserListItem';
// import actionsForm from 'src/modules/withdraw/form/withdrawFormActions';
import WithdrawActions from 'src/modules/withdraw/form/withdrawFormActions';
import userAction from 'src/modules/user/form/userFormActions';
function WithdrawListTable(props) {
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
    couponsSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    couponsSelectors.selectPermissionToDestroy,
  );

  const doOpenDestroyConfirmModal = (id) => {
    setRecordIdToDestroy(id);
  };

  const doCloseDestroyConfirmModal = () => {
    setRecordIdToDestroy(null);
  };

  const onSubmit = (id, values, user) => {
    const data = {
      user: user,
      status: values,
    };

    const item = {
      withdraw: values === 'success' ? true : false,
      id: user,
    };
    dispatch(WithdrawActions.doUpdate(id, data));
    // dispatch(userAction.edituserwithdraw(item))
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'ascend'
        ? 'descend'
        : 'ascend';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();

    dispatch(destroyActions.doDestroy(id));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };
  // const formSubmit = (id, e) => {
  //   let data = { status: e.target.value };
  //   dispatch(actionsForm.doUpdate(id, data));
  // };
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
            className="adherent-control-input"
            id="table-header-checkbox"
            checked={Boolean(isAllSelected)}
            onChange={() => doToggleAllSelected()}
          />
          <label
            htmlFor="table-header-checkbox"
            className="adherent-control-label"
          >
            &#160;
          </label>
        </div>
      )}
    </TableColumnHeader>

    <TableColumnHeader
      onSort={doChangeSort}
      hasRows={hasRows}
      sorter={sorter}
      name="orderNo"
      label={i18n('entities.withdraw.fields.orderNo')}
    />

    <TableColumnHeader
      onSort={doChangeSort}
      hasRows={hasRows}
      sorter={sorter}
      name="createdBy"
      label={i18n('entities.withdraw.fields.createdBy')}
    />

    <TableColumnHeader
      onSort={doChangeSort}
      hasRows={hasRows}
      sorter={sorter}
      name="currency"
      label={i18n('entities.withdraw.fields.currency')}
    />

    <TableColumnHeader
      onSort={doChangeSort}
      hasRows={hasRows}
      sorter={sorter}
      name="withdrawAmount"
      label={i18n('entities.withdraw.fields.withdrawAmount')}
    />

    <TableColumnHeader
      onSort={doChangeSort}
      hasRows={hasRows}
      sorter={sorter}
      name="fee"
      label={i18n('entities.withdraw.fields.fee')}
    />

    <TableColumnHeader
      onSort={doChangeSort}
      hasRows={hasRows}
      sorter={sorter}
      name="totalAmount"
      label={i18n('entities.withdraw.fields.totalAmount')}
    />

    <TableColumnHeader
      onSort={doChangeSort}
      hasRows={hasRows}
      sorter={sorter}
      name="auditor"
      label={i18n('entities.withdraw.fields.auditor')}
    />

    <TableColumnHeader
      onSort={doChangeSort}
      hasRows={hasRows}
      sorter={sorter}
      name="acceptTime"
      label={i18n('entities.withdraw.fields.acceptTime')}
    />

    <TableColumnHeader
      onSort={doChangeSort}
      hasRows={hasRows}
      sorter={sorter}
      name="status"
      label={i18n('entities.withdraw.fields.status')}
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
        <div className="d-flex justify-content-center">
          {i18n('table.noData')}
        </div>
      </td>
    </tr>
  )}
  {!loading &&
    rows.map((row) => (
      <tr key={row.id}>
        {/* Checkbox */}
        <th className="th-checkbox" scope="row">
          <div className="adherent-control adherent-checkbox">
            <input
              type="checkbox"
              className="adherent-control-input"
              id={`table-header-checkbox-${row.id}`}
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

        {/* Fields */}
        <td>{row.orderNo}</td>
        <td><UserListItem value={row.createdBy} /></td>
        <td>{row.currency}</td>
        <td>{row.withdrawAmount}</td>
        <td>{row.fee}</td>
        <td>{row.totalAmount}</td>
        <td><UserListItem value={row.auditor} /></td>
        <td>{row.acceptTime}</td>

        {/* Status with buttons */}
        <td>
          {row.status === 'pending' ? (
            <>
              <button
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '5px 10px',
                  marginRight: '8px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  onSubmit(row.id, 'success', row.user.id)
                }
              >
                Pass
              </button>
              <button
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '5px 10px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  onSubmit(row.id, 'canceled', row.user.id)
                }
              >
                Rejection
              </button>
            </>
          ) : (
            <span
              style={{
                color: row.status === 'success' ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              {row.status}
            </span>
          )}
        </td>

        {/* Actions */}
        <td className="td-actions">
          {hasPermissionToEdit && (
            <Link
              className="btn btn-link"
              to={`/withdraw/${row.id}/edit`}
            >
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

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
      />

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </TableWrapper>
  );
}

export default WithdrawListTable;
