/**
 * Card component - Part of global UI kit
 * Flexible container with consistent styling
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({
  children,
  padding = 'md',
  shadow = 'md',
  hover = false,
  onClick,
  as: Component = 'div',
  className = '',
  ...props
}) => {
  const baseClasses = 'card';
  const paddingClass = `card--padding-${padding}`;
  const shadowClass = `card--shadow-${shadow}`;
  const hoverClass = hover ? 'card--hover' : '';
  const clickableClass = onClick ? 'card--clickable' : '';
  
  const classes = [
    baseClasses,
    paddingClass,
    shadowClass,
    hoverClass,
    clickableClass,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <Component
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
      {...props}
    >
      {children}
    </Component>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  hover: PropTypes.bool,
  onClick: PropTypes.func,
  as: PropTypes.elementType,
  className: PropTypes.string,
};

export default Card;
