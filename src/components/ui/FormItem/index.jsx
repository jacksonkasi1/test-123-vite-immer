import React from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { CONTROL_SIZES, SIZES } from '../../../utils/constant';

const FormItem = React.forwardRef((props, ref) => {
  const {
    children,
    label,
    labelClass,
    errorMessage,
    invalid,
    className,
    asterisk,
    style,
    extra,
    htmlFor,
  } = props;


  const getFormLabelLayoutClass = () => {
    return label
      ? `h-${CONTROL_SIZES['md']} ${
          label && 'ltr:pr-2 rtl:pl-2'
        }`
      : 'ltr:pr-2 rtl:pl-2';
  };

  const formItemClass = classNames(
    'form-item',
    className,
    invalid ? 'invalid' : '',
  );

  const formLabelClass = classNames(
    'form-label',
    label && getFormLabelLayoutClass(),
    labelClass,
  );

  const formLabelStyle = () => {
    return { ...style };
  };

  const enterStyle = { opacity: 1, marginTop: 3, bottom: -21 };
  const exitStyle = { opacity: 0, marginTop: -10 };
  const initialStyle = exitStyle;

  return (
    <div ref={ref} className={formItemClass}>
      <label
        htmlFor={htmlFor}
        className={formLabelClass}
        style={formLabelStyle()}
      >
        {asterisk && <span className="text-red-500 ltr:mr-1 rtl:ml-1">*</span>}
        {label}
        {extra && <span>{extra}</span>}
        {label  && ':'}
      </label>
      <div
        className={
          ''
        }
      >
        {children}
        <AnimatePresence mode='wait'>
          {invalid && (
            <motion.div
              className="form-explain"
              initial={initialStyle}
              animate={enterStyle}
              exit={exitStyle}
              transition={{ duration: 0.15, type: 'tween' }}
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

FormItem.propTypes = {
  size: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.MD]),
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorMessage: PropTypes.string,
  invalid: PropTypes.bool,
  asterisk: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  htmlFor: PropTypes.string,
  labelClass: PropTypes.string,
};

export default FormItem;
