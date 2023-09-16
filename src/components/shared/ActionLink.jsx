import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ActionLink = (props) => {
  const themeCol = useSelector((state) => state.themeConfigs.themeColor);
  const primaryColorLevel = useSelector(
    (state) => state.themeConfigs.colorLevel,
  );
  const textTheme = `text-${themeCol}-${primaryColorLevel}`;

  const {
    children,
    className,
    themeColor = true,
    to,
    href = '',
    ...rest
  } = props;

  const classNameProps = {
    className: classNames(
      themeColor && textTheme,
      'hover:underline',
      className,
    ),
  };

  return to ? (
    <Link to={to} {...classNameProps} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} {...classNameProps} {...rest}>
      {children}
    </a>
  );
};

ActionLink.propTypes = {
  themeColor: PropTypes.bool,
  to: PropTypes.string,
};

ActionLink.defaultProps = {
  themeColor: true,
};

export default ActionLink;
