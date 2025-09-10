import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import spotSelectors from 'src/modules/spot/spotSelectors';
import destroyActions from 'src/modules/spot/destroy/spotDestroyActions';
import destroySelectors from 'src/modules/spot/destroy/spotDestroySelectors';
import actions from 'src/modules/spot/list/spotListActions';
import selectors from 'src/modules/spot/list/spotListSelectors';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import UserListItem from 'src/view/user/list/UserListItem';
import SpotActions from 'src/modules/spot/form/spotFormActions';

function SpotListTable() {
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
  const hasPermissionToEdit = useSelector(spotSelectors.selectPermissionToEdit);
  const hasPermissionToDestroy = useSelector(spotSelectors.selectPermissionToDestroy);

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

  const onSubmitStatus = (id, status, userId) => {
    const data = { user: userId, status };
    dispatch(SpotActions.doUpdate(id, data));
  };

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
                      onChange={doToggleAllSelected}
                    />
                    <label htmlFor="table-header-checkbox" className="adherent-control-label">
                      &#160;
                    </label>
                  </div>
                )}
              </TableColumnHeader>

              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="orderNo" label={i18n('entities.spot.fields.orderNo')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="userAccount" label={i18n('entities.spot.fields.userAccount')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="tradingPair" label={i18n('entities.spot.fields.tradingPair')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="direction" label={i18n('entities.spot.fields.direction')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="delegateType" label={i18n('entities.spot.fields.delegateType')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="delegateState" label={i18n('entities.spot.fields.delegateState')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="orderQuantity" label={i18n('entities.spot.fields.orderQuantity')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="commissionPrice" label={i18n('entities.spot.fields.commissionPrice')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="entrustedValue" label={i18n('entities.spot.fields.entrustedValue')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="transactionQuantity" label={i18n('entities.spot.fields.transactionQuantity')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="transactionValue" label={i18n('entities.spot.fields.transactionValue')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="closingPrice" label={i18n('entities.spot.fields.closingPrice')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="handlingFee" label={i18n('entities.spot.fields.handlingFee')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="commissionTime" label={i18n('entities.spot.fields.commissionTime')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="closingTime" label={i18n('entities.spot.fields.closingTime')} />
              <TableColumnHeader onSort={doChangeSort} hasRows={hasRows} sorter={sorter} name="createdBy" label={i18n('entities.spot.fields.createdBy')} />

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
                        className="adherent-control-input"
                        id={`table-header-checkbox-${row.id}`}
                        checked={selectedKeys.includes(row.id)}
                        onChange={() => doToggleOneSelected(row.id)}
                      />
                      <label htmlFor={`table-header-checkbox-${row.id}`} className="adherent-control-label">
                        &#160;
                      </label>
                    </div>
                  </th>

                  <td>{row.orderNo}</td>
                  <td>{row.userAccount}</td>
                  <td>{row.tradingPair}</td>
                  <td>{row.direction}</td>
                  <td>{row.delegateType}</td>
                  <td>{row.delegateState}</td>
                  <td>{row.orderQuantity}</td>
                  <td>{row.commissionPrice}</td>
                  <td>{row.entrustedValue}</td>
                  <td>{row.transactionQuantity}</td>
                  <td>{row.transactionValue}</td>
                  <td>{row.closingPrice}</td>
                  <td>{row.handlingFee}</td>
                  <td>{row.commissionTime}</td>
                  <td>{row.closingTime}</td>
                  <td><UserListItem value={row.createdBy} /></td>


                  <td className="td-actions">
                    {hasPermissionToEdit && (
                      <Link className="btn btn-link" to={`/spot/${row.id}/edit`}>
                        {i18n('common.edit')}
                      </Link>
                    )}
                    {hasPermissionToDestroy && (
                      <button className="btn btn-link" type="button" onClick={() => doOpenDestroyConfirmModal(row.id)}>
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

export default SpotListTable;
