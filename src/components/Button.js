import PropTypes from 'prop-types';
import React from 'react';

export default class Button extends React.Component {
  render() {
    const { onClick, value, name, children, datatestid, disabled, key } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        value={ value }
        name={ name }
        data-testid={ datatestid }
        id={ name }
        disabled={ disabled }
        key={ key }
      >
        { children }
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
