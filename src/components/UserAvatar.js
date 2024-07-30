import React from 'react';

// Avatar component
const Avatar = ({ firstName = '-', lastName = '-', width, height }) => {
  // Extract the first letters of firstName and startName
  const initials = `${firstName[0]}${lastName[0]}`;

  // Styles for the avatar
  const avatarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
    borderRadius: '50%',
    backgroundColor: '#b0b1b2',
    color: 'white',
    fontSize: '16px',
    textTransform: 'uppercase',
  };

  return <div style={avatarStyle}>{initials}</div>;
};

export default Avatar;
