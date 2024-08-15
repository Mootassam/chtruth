import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";
import styled, { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  body {
    background-image: #1c1d21 !important;
  height:100dvh;
  }
`;

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.username"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});
function Signin() {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const [initialValues] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };
  return (
    <>
    <GlobalStyle/> 
    <div className="auth__page">
      <div className="auth__header">

<img src="/icons/Mexec.svg" alt=""  style={{width:230}}  />
<div className="signin__logo">
        <h1 className="auth__title"> Welcome Back!</h1>
        <span className="auth__description">
          You have been missed for long time
        </span>
        </div>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="auth__form">
            <div className="form__authgroup">
              <InputFormItem
                type="text"
                name="email"
                placeholder={i18n("user.fields.username")}
                className="auth__input"
                externalErrorMessage={externalErrorMessage}
              />
            </div>
            <div className="form__authgroup">
              <InputFormItem
                type="text"
                name="password"
                placeholder={i18n("user.fields.password")}
                className="auth__input"
              />
            </div>
          </div>

          <div className="auth__bottom">
            <button className="auth__button" disabled={loading} type="submit">
              <ButtonIcon loading={loading} />
              <span>Login</span>
            </button>
            <Link to="/auth/signup" className="remove__ligne">
              <span className="auth__link">Don't have an account?</span>
              <label htmlFor="" className="register__now">Register Now</label>
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
    </>
  );
}

export default Signin;
