import React from 'react';

const SafeIcon = ({ icon: IconComponent, className = '' }) => {
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

export default SafeIcon;
