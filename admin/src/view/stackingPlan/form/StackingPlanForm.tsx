import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';

const schema = yup.object().shape({
  currency: yupFormSchemas.enumerator(
    i18n('entities.stackingPlan.fields.currency'),
    {
      options: ['USDT', 'SUI', 'XRP', 'SOL', 'BTC', 'ETH'],
      required: true,
    },
  ),
  dailyRate: yupFormSchemas.decimal(
    i18n('entities.stackingPlan.fields.dailyRate'),
    { required: true },
  ),
  minimumStake: yupFormSchemas.decimal(
    i18n('entities.stackingPlan.fields.minimumStake'),
    { required: true },
  ),
  maxStake: yupFormSchemas.decimal(
    i18n('entities.stackingPlan.fields.maxStake'),
    { required: true },
  ),
  unstakingPeriod: yupFormSchemas.integer(
    i18n('entities.stackingPlan.fields.unstakingPeriod'),
    { required: true },
  ),
  status: yupFormSchemas.enumerator(
    i18n('entities.stackingPlan.fields.status'),
    {
      options: ['active', 'completed', 'cancelled'],
      required: true,
    },
  ),
});

function StackingPlanForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      currency: record.currency || '',
      dailyRate: record.dailyRate,
      minimumStake: record.minimumStake,
      maxStake: record.maxStake,
      unstakingPeriod: record.unstakingPeriod,
      status: record.status || 'active',
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
            <div className="col-lg-6 col-md-8 col-12">
              <SelectFormItem
                name="currency"
                label={i18n('entities.stackingPlan.fields.currency')}
                options={[
                  { value: 'USDT', label: 'USDT' },
                  { value: 'SUI', label: 'SUI' },
                  { value: 'XRP', label: 'XRP' },
                  { value: 'SOL', label: 'SOL' },
                  { value: 'BTC', label: 'BTC' },
                  { value: 'ETH', label: 'ETH' },
                ]}
                required={true}
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="dailyRate"
                label={i18n('entities.stackingPlan.fields.dailyRate')}
                required={true}
                type="number"
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="minimumStake"
                label={i18n('entities.stackingPlan.fields.minimumStake')}
                required={true}
                type="number"
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="maxStake"
                label={i18n('entities.stackingPlan.fields.maxStake')}
                required={true}
                type="number"
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="unstakingPeriod"
                label={i18n('entities.stackingPlan.fields.unstakingPeriod')}
                required={true}
                type="number"
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <SelectFormItem
                name="status"
                label={i18n('entities.stackingPlan.fields.status')}
                options={[
                  { value: 'active', label: i18n('entities.stackingPlan.enumerators.status.active') },
                  { value: 'completed', label: i18n('entities.stackingPlan.enumerators.status.completed') },
                  { value: 'cancelled', label: i18n('entities.stackingPlan.enumerators.status.cancelled') },
                ]}
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
              &nbsp;{i18n('common.save')}
            </button>

            <button
              className="btn btn-light"
              type="button"
              disabled={props.saveLoading}
              onClick={onReset}
            >
              <i className="fas fa-undo"></i>
              &nbsp;{i18n('common.reset')}
            </button>

            {props.onCancel ? (
              <button
                className="btn btn-light"
                type="button"
                disabled={props.saveLoading}
                onClick={() => props.onCancel()}
              >
                <i className="fas fa-times"></i>
                &nbsp;{i18n('common.cancel')}
              </button>
              
            ) : null}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default StackingPlanForm;
