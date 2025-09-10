
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';
import transactionEnumerators from 'src/modules/transaction/transactionEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';

const schema = yup.object().shape({
  orderno: yupFormSchemas.string(
    i18n('entities.deposit.fields.orderno'),
    {
      required: true,
    },
  ),
  amount: yupFormSchemas.decimal(
    i18n('entities.deposit.fields.amount'),
    {
      required: true,
    },
  ),
  txid: yupFormSchemas.string(
    i18n('entities.deposit.fields.txid'),
    {
      required: true,
    },
  ),
  rechargechannel: yupFormSchemas.string(
    i18n('entities.deposit.fields.rechargechannel'),
    {
      required: true,
    },
  ),
  rechargetime: yupFormSchemas.datetime(
    i18n('entities.deposit.fields.rechargetime'),
    {
      required: true,
    },
  ),
  auditor: yupFormSchemas.relationToOne(
    i18n('entities.deposit.fields.auditor'),
    {},
  ),
  acceptime: yupFormSchemas.datetime(
    i18n('entities.deposit.fields.acceptime'),
    {},
  ),
  status: yupFormSchemas.enumerator(
    i18n('entities.deposit.fields.status'),
    {
      options: transactionEnumerators.status,
    },
  ),
});

function TransactionForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      orderno: record.orderno,
      amount: record.amount,
      txid: record.txid,
      rechargechannel: record.rechargechannel,
      rechargetime: record.rechargetime,
      auditor: record.auditor || [],
      acceptime: record.acceptime,
      status: record.status,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.record?.id, values);
  };
 
  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="row">

            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="orderno"
                label={i18n('entities.deposit.fields.orderno')}
                required={true}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="amount"
                label={i18n('entities.deposit.fields.amount')}
                required={true}
                type="number"
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="txid"
                label={i18n('entities.deposit.fields.txid')}
                required={true}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="rechargechannel"
                label={i18n('entities.deposit.fields.rechargechannel')}
                required={true}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="rechargetime"
                label={i18n('entities.deposit.fields.rechargetime')}
                required={true}
                type="datetime-local"
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <UserAutocompleteFormItem
                name="auditor"
                label={i18n('entities.deposit.fields.auditor')}
                required={false}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="acceptime"
                label={i18n('entities.deposit.fields.acceptime')}
                required={false}
                type="datetime-local"
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
             <SelectFormItem
                name="status"
                label={i18n(
                  'entities.transaction.fields.status',
                )}
                options={transactionEnumerators.status.map(
                  (value) => ({
                    value,
                    label: i18n(
                      `entities.transaction.enumerators.status.${value}`,
                    ),
                  }),
                )}
                required={true}
              />
            </div>
          </div>

          <div className="form-buttons">
            <button
              className="btn btn-primary"
              disabled={props.saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <ButtonIcon
                loading={props.saveLoading}
                iconClass="far fa-save"
              />
              &nbsp;
              {i18n('common.save')}
            </button>

            <button
              className="btn btn-light"
              type="button"
              disabled={props.saveLoading}
              onClick={onReset}
            >
              <i className="fas fa-undo"></i>
              &nbsp;
              {i18n('common.reset')}
            </button>

            {props.onCancel ? (
              <button
                className="btn btn-light"
                type="button"
                disabled={props.saveLoading}
                onClick={() => props.onCancel()}
              >
                <i className="fas fa-times"></i>&nbsp;
                {i18n('common.cancel')}
              </button>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default TransactionForm;