import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import FormErrors from "./FormErrors";
import Message from "src/view/shared/message";

export function FieldFormItem(props) {
  const {
    label,
    description,
    name,
    hint,
    type,
    placeholder,
    autoFocus,
    autoComplete,
    required,
    externalErrorMessage,
    disabled,
    endAdornment,
    className,
    className1,
    className2,
    className3,
    inputMode,
    step,
    pattern,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
  } = useFormContext();

  if (externalErrorMessage) {
    Message.error(externalErrorMessage);
  }

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted
  );

  const inputType =
    type === "password" && showPassword ? "text" : type;

  return (
    <div className={className1}>
      {Boolean(label) && (
        <label
          className={`${className2} ${required ? "required" : ""}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      {description}

      <div
        className={className3}
        style={className === "captcha-input" ? { padding: 0 } : {}}
      >
        <input
          className={`${className} ${errorMessage ? "__danger" : ""}`}
          id={name}
          name={name}
          type={inputType}
          step={step}
          inputMode={inputMode}
          pattern={pattern}
          ref={register}
          onChange={(event) => {
            props.onChange?.(event.target.value);
          }}
          onBlur={(event) => {
            props.onBlur?.(event);
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          disabled={disabled}
        />

        {inputType === "password" && (
          <button
            className="toggle-password"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i
              className={`fas ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
            />
          </button>
        )}
      </div>

      {endAdornment && (
        <div className="input-group-append">
          <span className="input-group-text">{endAdornment}</span>
        </div>
      )}

      <div className="invalid-feedback">{errorMessage}</div>

      {Boolean(hint) && (
        <small className="form-text text-muted">
          {hint}
        </small>
      )}
    </div>
  );
}

FieldFormItem.defaultProps = {
  type: "text",
  required: false,
  step: undefined,
  inputMode: undefined,
  pattern: undefined,
};

FieldFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.node,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  endAdornment: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  className1: PropTypes.string,
  className2: PropTypes.string,
  className3: PropTypes.string,

  // Number/decimal support
  step: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  inputMode: PropTypes.string,
  pattern: PropTypes.string,
};

export default FieldFormItem;