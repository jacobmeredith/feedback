import * as React from "react";

interface IDrawerProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

function Drawer({ open = false, children, onClose = () => {}}: IDrawerProps) {
  const [isOpen, setIsOpen] = React.useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const styles = {
    sm: `rounded-tl-lg rounded-tr-lg h-3/4 w-full left-0 bottom-0 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`,
    md: `md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none md:h-full md:w-1/2 md:left-auto md:bottom-auto bottom-0 md:left-none md:top-0 md:right-0 md:translate-y-0 ${isOpen ? 'md:translate-x-0' : 'md:translate-x-full'}`
  }

  return (
    <React.Fragment>
      {isOpen && <div data-testid="drawer-overlay" className={`fixed w-full h-full inset-0 z-20 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={onClose} />}
      <aside className={`transform fixed overflow-auto ease-in-out duration-300 transition-all bg-white p-6 border border-solid border-gray-300 z-30 ${styles.sm} ${styles.md}`}>
        <button data-testid="drawer-close" className="absolute top-1 right-3 text-2xl" onClick={onClose}>&times;</button>
        {children}
      </aside>
    </React.Fragment>
  )
}

export {Drawer};
