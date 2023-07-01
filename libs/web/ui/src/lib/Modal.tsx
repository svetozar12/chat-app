import React, { FunctionComponent } from 'react';
import cx from 'classnames';

interface IModal {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  className?: string;
}

const Modal: FunctionComponent<IModal> = ({
  children,
  isOpen,
  title,
  className,
}) => {
  if (!isOpen) return null;
  return (
    <div className={cx(className, 'rounded-xl')}>
      <h1 className="text-white text-center text-2xl my-5 font-semibold">
        {title}
      </h1>
      {children}
    </div>
  );
};

export { Modal };
