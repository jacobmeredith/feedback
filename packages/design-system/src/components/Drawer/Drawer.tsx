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

  return (
    <React.Fragment>
      {isOpen && <div data-testid="drawer-overlay" className={`fixed w-full h-full inset-0 z-20 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={onClose} />}
      <aside className={`transform fixed h-full overflow-auto ease-in-out duration-300 transition-all top-0 right-0 w-1/2 bg-white p-6 rounded-l-lg border border-solid border-gray-300 z-30 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button data-testid="drawer-close" className="absolute top-1 right-3 text-2xl" onClick={onClose}>&times;</button>
        {children}
      </aside>
    </React.Fragment>
  )
}

export {Drawer};
