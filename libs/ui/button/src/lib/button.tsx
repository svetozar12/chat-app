import cx from 'classnames';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={cx(className, 'bg-slate-800 rounded-md p-2')}>
      {children}
    </button>
  );
}
