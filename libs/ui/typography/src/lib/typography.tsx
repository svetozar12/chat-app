import React from 'react';

interface ITypography {
  children: React.ReactNode;
}

export function Typography({ children }: ITypography) {
  return <div className="font-sans text-white">{children}</div>;
}
