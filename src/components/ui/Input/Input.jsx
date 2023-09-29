import React, { useState, useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CONTROL_SIZES, SIZES } from '@utils/constant';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { useSelector } from 'react-redux';

/**
 * Input component for handling user input.
 *
 * @param {object} props - The component's props.
 * @param {string} [props.asElement='input'] - The HTML element to use for the input.
 * @param {string} [props.className=''] - Additional CSS class names for styling.
 * @param {boolean} [props.disabled=false] - Whether the input is disabled.
 * @param {boolean} [props.invalid=false] - Whether the input is in an invalid state.
 * @param {string} [props.prefix] - A prefix element or string to display before the input.
 * @param {string} [props.size] - The size of the input, one of 'lg', 'sm', or 'md'.
 * @param {string} [props.suffix] - A suffix element or string to display after the input.
 * @param {boolean} [props.unstyle=false] - Whether to apply default styles to the input.
 * @param {string} props.type - The type of input ('text' by default).
 * @param {object} props.style - Inline styles to apply to the input.
 * @param {object} props.field - The field object for form management (e.g., from Formik).
 * @param {object} props.form - The form object for form management (e.g., from Formik).
 * @returns {JSX.Element} The Input component.
 */
const Input = React.forwardRef((props, ref) => {
  const {
    asElement: Component,
    className,
    disabled,
    invalid,
    prefix,
    size,
    suffix,
    type,
    style,
    unstyle,
    field,
    form,
    ...rest
  } = props;

  const { themeColor, colorLevel } = useSelector(
    (state) => state.themeConfigs,
  );

  const primaryColorLevel = colorLevel;

  const [prefixGutter, setPrefixGutter] = useState(0);
  const [suffixGutter, setSuffixGutter] = useState(0);

  const inputSize = size;

  const isInvalid = useMemo(() => {
    let validate = false;
    if (!isEmpty(form)) {
      const { touched, errors } = form;
      const touchedField = get(touched, field.name);
      const errorField = get(errors, field.name);
      validate = touchedField && errorField;
    }
    if (typeof invalid === 'boolean') {
      validate = invalid;
    }
    return validate;
  }, [form, invalid, field]);

  const inputDefaultClass = 'input';
  const inputSizeClass = `input-${inputSize} h-${CONTROL_SIZES[inputSize]}`;
  const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`;
  const inputWrapperClass = `input-wrapper ${
    prefix || suffix ? className : ''
  }`;
  const inputClass = classNames(
    inputDefaultClass,
    !isInvalid && inputFocusClass,
    !prefix && !suffix ? className : '',
    disabled && 'input-disabled',
    isInvalid && 'input-invalid'
  );

  const prefixNode = useRef();
  const suffixNode = useRef();

  const getAffixSize = () => {
    if (!prefixNode.current && !suffixNode.current) {
      return;
    }
    const prefixNodeWidth = prefixNode?.current?.offsetWidth;
    const suffixNodeWidth = suffixNode?.current?.offsetWidth;

    if (prefixNodeWidth) {
      setPrefixGutter(prefixNodeWidth);
    }

    if (suffixNodeWidth) {
      setSuffixGutter(suffixNodeWidth);
    }
  };

  useEffect(() => {
    getAffixSize();
  }, [prefix, suffix]);

  const remToPxConvertion = (pixel) => 0.0625 * pixel;

  const affixGutterStyle = () => {
    const leftGutter = `${remToPxConvertion(prefixGutter) + 1}rem`;
    const rightGutter = `${remToPxConvertion(suffixGutter) + 1}rem`;
    let gutterStyle = {};

    if (prefix) {
      gutterStyle.paddingLeft = leftGutter;
    }

    if (suffix) {
      gutterStyle.paddingRight = rightGutter;
    }

    return gutterStyle;
  };

  const inputProps = {
    className: !unstyle ? inputClass : '',
    disabled,
    type,
    ref,
    ...field,
    ...rest,
  };

  const renderInput = (
    <Component style={{ ...affixGutterStyle(), ...style }} {...inputProps} />
  );

  const renderAffixInput = (
    <span className={inputWrapperClass}>
      {prefix ? (
        <div
          className="input-suffix-start"
          ref={(node) => (prefixNode.current = node)}
        >
          {' '}
          {prefix}{' '}
        </div>
      ) : null}
      {renderInput}
      {suffix ? (
        <div
          className="input-suffix-end left-2"
          ref={(node) => (suffixNode.current = node)}
        >
          {suffix}
        </div>
      ) : null}
    </span>
  );

  const renderChildren = () => {
    if (prefix || suffix) {
      return renderAffixInput;
    } else {
      return renderInput;
    }
  };

  return renderChildren();
});

Input.defaultProps = {
  type: 'text',
  asElement: 'input',
  className: '',
  unstyle: false,
};

export default Input;
