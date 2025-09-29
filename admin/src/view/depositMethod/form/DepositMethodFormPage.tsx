import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/depositMethod/form/depositMethodFormActions';
import selectors from 'src/modules/depositMethod/form/depositMethodFormSelectors';
import { getHistory } from 'src/modules/store';
import DepositMethodForm from 'src/view/depositMethod/form/DepositMethodForm';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import Spinner from 'src/view/shared/Spinner';
import PageTitle from 'src/view/shared/styles/PageTitle';

function StackingPlanFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading, 
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.params.id);
  console.log(isEditing, "I am the best");
  
  const title = isEditing
    ? i18n('entities.stackingPlan.edit.title')
    : i18n('entities.stackingPlan.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(actions.doUpdate(id, data));
    } else {

    }
  };

  return (
    <>
      {/* <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.stackingPlan.menu'), '/stacking'],
          [title],
        ]}
      /> */}

      <ContentWrapper>
        <PageTitle>{title}</PageTitle>

        {initLoading && <Spinner />}

        {dispatched && !initLoading && (
          <DepositMethodForm
            saveLoading={saveLoading}
            initLoading={initLoading}
            record={record}
            isEditing={isEditing}
            onSubmit={doSubmit}
            onCancel={() => getHistory().push('/stacking')}
          />
        )}
      </ContentWrapper>
    </>
  );
}

export default StackingPlanFormPage;
