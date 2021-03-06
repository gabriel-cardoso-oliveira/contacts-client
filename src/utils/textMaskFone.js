import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

function TextMaskFone(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskFone.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default TextMaskFone;
