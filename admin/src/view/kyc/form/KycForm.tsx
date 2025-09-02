import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';

import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import Storage from 'src/security/storage';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';

const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(
    i18n('entities.vip.fields.title'),
    {
      required: true,
    },
  ),
  Documenttype: yupFormSchemas.string(
    i18n('Documenttype'),
    {
      required: true,
    },
  ),
  realname: yupFormSchemas.string(i18n('realname'), {
    required: true,
  }),
  idnumer: yupFormSchemas.string(i18n('idnumer'), {}),
  front: yupFormSchemas.images(i18n('front'), {}),
  back: yupFormSchemas.images(i18n('back'), {}),

  selfie: yupFormSchemas.images(i18n('selfie'), {}),
  status: yupFormSchemas.boolean(i18n('status'), {}),
});

function KycForm(props) {
  const [initialValues] = useState(() => {
    const record = props.record || {};
    return {
      user: record.user || [],
      Documenttype: record.Documenttype,
      realname: record.realname,
      idnumer: record.idnumer,
      front: record.front || [],
      back: record.back || [],
      selfie: record.selfie || [],
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
              <UserAutocompleteFormItem
                name="user"
                label={i18n(
                  'entities.kyc.fields.useraccount',
                )}
                required={true}
                autoFocus
              />
            </div>
            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="Documenttype"
                label={i18n(
                  'entities.kyc.fields.documenttype',
                )}
                required={true}
                autoFocus
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="realname"
                label={i18n('entities.kyc.fields.realname')}
                required={true}
                autoFocus
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <InputFormItem
                name="idnumer"
                label={i18n('entities.kyc.fields.idnumber')}
                required={true}
                autoFocus
              />
            </div>
            <div className="col-lg-7 col-md-8 col-12">
              <ImagesFormItem
                name="front"
                label={i18n(
                  'entities.paymentsettings.fields.photo',
                )}
                required={false}
                storage={Storage.values.categoryPhoto}
                max={undefined}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <ImagesFormItem
                name="back"
                label={i18n(
                  'entities.paymentsettings.fields.photo',
                )}
                required={false}
                storage={Storage.values.categoryPhoto}
                max={undefined}
              />
            </div>

            <div className="col-lg-7 col-md-8 col-12">
              <ImagesFormItem
                name="selfie"
                label={i18n(
                  'entities.paymentsettings.fields.photo',
                )}
                required={false}
                storage={Storage.values.categoryPhoto}
                max={undefined}
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

export default KycForm;
