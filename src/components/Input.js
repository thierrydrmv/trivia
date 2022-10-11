import PropTypes from 'prop-types';
import React from 'react';

export default class Input extends React.Component {
  render() {
    const { onChange, type, value, name, children, datatestid, className } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          {children}
          <input
            onChange={ onChange }
            type={ type }
            value={ value }
            name={ name }
            data-testid={ datatestid }
            id={ name }
            className={ className }
          />
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
};
