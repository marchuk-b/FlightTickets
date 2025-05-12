import * as Dialog from '@radix-ui/react-dialog';
import './Modal.css';

export const Modal = ({ open, onOpenChange, title, children }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" onClick={() => onOpenChange(false)} />
        <Dialog.Content className="modal__content">
          <Dialog.Title className="modal__title">{title}</Dialog.Title>

          {children}

          <Dialog.Close className="modal__close" onClick={() => onOpenChange(false)}>×</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
