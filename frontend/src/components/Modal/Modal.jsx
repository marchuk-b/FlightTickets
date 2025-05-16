import * as Dialog from '@radix-ui/react-dialog';
import './Modal.css';

export const Modal = ({ open, onOpenChange, title, children, additionalClass }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" onClick={() => onOpenChange(false)} />
        <Dialog.Content className={`modal__content ${additionalClass}`} aria-describedby="dialog-desc">
          <Dialog.Title className={`modal__title ${additionalClass}`}>{title}</Dialog.Title>
          <Dialog.Description className={`modal__subtitle ${additionalClass}`}>
            Щоб закрити вікно, натисніть на область поза вікном
          </Dialog.Description>
          {children}

          {/* <Dialog.Close className="modal__close" onClick={() => onOpenChange(false)}>×</Dialog.Close> */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
