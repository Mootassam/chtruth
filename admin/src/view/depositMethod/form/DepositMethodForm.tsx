import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  symbol: yupFormSchemas.string(i18n('entities.depositMethod.fields.symbol'), {  }),
  name: yupFormSchemas.string(i18n('entities.depositMethod.fields.name'), {  }),
  address: yupFormSchemas.string(i18n('entities.depositMethod.fields.address'), {  }),
});

function DepositMethodForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};

    console.log(record);
    
    return {
      symbol: record.symbol || '',
      name: record.name || '',
      address: record.address || '',
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

  const onReset = () => form.reset(initialValues);

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="symbol"
                label={i18n('entities.depositMethod.fields.symbol')}
                required
              />
            </div>

            <div className="col-lg-6 col-md-8 col-12">
              <InputFormItem
                name="name"
                label={i18n('entities.depositMethod.fields.name')}
                required
              />
            </div>

            <div className="col-lg-12 col-md-12 col-12">
              <InputFormItem
                name="address"
                label={i18n('entities.depositMethod.fields.address')}
                required
              />
            </div>
          </div>

          <div className="form-buttons mt-3">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={props.saveLoading}
            >
              <ButtonIcon loading={props.saveLoading} iconClass="far fa-save" />
              &nbsp;{i18n('common.save')}
            </button>

            <button
              className="btn btn-light ms-2"
              type="button"
              onClick={onReset}
              disabled={props.saveLoading}
            >
              <i className="fas fa-undo"></i>
              &nbsp;{i18n('common.reset')}
            </button>

            {props.onCancel && (
              <button
                className="btn btn-light ms-2"
                type="button"
                onClick={() => props.onCancel()}
                disabled={props.saveLoading}
              >
                <i className="fas fa-times"></i>
                &nbsp;{i18n('common.cancel')}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default DepositMethodForm;
