import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

export default function Qr(props) {
  const { value } = props;
  return (
    <QRCode value={value} />
  );
}
Qr.propTypes = {
  value: PropTypes.string.isRequired,
};
