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
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import spotEnumerators from 'src/modules/spot/spotEnumerators';

const schema = yup.object().shape({
  orderNo: yupFormSchemas.string(i18n('entities.spot.fields.orderNo'), { required: true }),
  userAccount: yupFormSchemas.string(i18n('entities.spot.fields.userAccount'), { required: true }),
  tradingPair: yupFormSchemas.string(i18n('entities.spot.fields.tradingPair'), { required: true }),
  direction: yupFormSchemas.enumerator(i18n('entities.spot.fields.direction'), { options: ['BUY', 'SELL'], required: true }),
  delegateType: yupFormSchemas.string(i18n('entities.spot.fields.delegateType'), { required: true }),
  delegateState: yupFormSchemas.string(i18n('entities.spot.fields.delegateState'), { required: true }),
  orderQuantity: yupFormSchemas.decimal(i18n('entities.spot.fields.orderQuantity'), { required: true }),
  commissionPrice: yupFormSchemas.decimal(i18n('entities.spot.fields.commissionPrice'), { required: true }),
  entrustedValue: yupFormSchemas.decimal(i18n('entities.spot.fields.entrustedValue'), { required: true }),
  transactionQuantity: yupFormSchemas.decimal(i18n('entities.spot.fields.transactionQuantity')),
  transactionValue: yupFormSchemas.decimal(i18n('entities.spot.fields.transactionValue')),
  closingPrice: yupFormSchemas.decimal(i18n('entities.spot.fields.closingPrice')),
  handlingFee: yupFormSchemas.decimal(i18n('entities.spot.fields.handlingFee')),
  commissionTime: yupFormSchemas.datetime(i18n('entities.spot.fields.commissionTime')),
  closingTime: yupFormSchemas.datetime(i18n('entities.spot.fields.closingTime')),
  createdBy: yupFormSchemas.relationToOne(i18n('entities.spot.fields.createdBy')),
});

function SpotForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      orderNo: record.orderNo,
      userAccount: record.userAccount,
      tradingPair: record.tradingPair,
      direction: record.direction,
      delegateType: record.delegateType,
      delegateState: record.delegateState,
      orderQuantity: record.orderQuantity,
      commissionPrice: record.commissionPrice,
      entrustedValue: record.entrustedValue,
      transactionQuantity: record.transactionQuantity,
      transactionValue: record.transactionValue,
      closingPrice: record.closingPrice,
      handlingFee: record.handlingFee,
      commissionTime: record.commissionTime,
      closingTime: record.closingTime,
      createdBy: record.createdBy,
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
    Object.keys(initialValues).forEach((key) => form.setValue(key, initialValues[key]));
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="row">
            {Object.keys(initialValues).map((field) => (
              <div key={field} className="col-lg-7 col-md-8 col-12">
                {field === 'createdBy' ? (
                  <UserAutocompleteFormItem name={field} label={i18n(`entities.spot.fields.${field}`)} />
                ) : field === 'direction' || field === 'status' ? (
                  <SelectFormItem
                    name={field}
                    label={i18n(`entities.spot.fields.${field}`)}
                    options={(field === 'direction' ? ['BUY', 'SELL'] : spotEnumerators.status).map((v) => ({ value: v, label: v }))}
                  />
                ) : field.includes('Time') ? (
                  <InputFormItem name={field} label={i18n(`entities.spot.fields.${field}`)} type="datetime-local" />
                ) : field.includes('Price') || field.includes('Quantity') || field.includes('Value') || field.includes('Fee') ? (
                  <InputFormItem name={field} label={i18n(`entities.spot.fields.${field}`)} type="number" />
                ) : (
                  <InputFormItem name={field} label={i18n(`entities.spot.fields.${field}`)} />
                )}
              </div>
            ))}
          </div>

          <div className="form-buttons">
            <button className="btn btn-primary" disabled={props.saveLoading} type="button" onClick={form.handleSubmit(onSubmit)}>
              <ButtonIcon loading={props.saveLoading} iconClass="far fa-save" />&nbsp;{i18n('common.save')}
            </button>

            <button className="btn btn-light" type="button" disabled={props.saveLoading} onClick={onReset}>
              <i className="fas fa-undo"></i>&nbsp;{i18n('common.reset')}
            </button>

            {props.onCancel && (
              <button className="btn btn-light" type="button" disabled={props.saveLoading} onClick={() => props.onCancel()}>
                <i className="fas fa-times"></i>&nbsp;{i18n('common.cancel')}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default SpotForm;
