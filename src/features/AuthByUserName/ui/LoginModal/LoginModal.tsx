import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginModal.module.scss';
import { Modal } from 'shared/ui/Modal';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  handleClose: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
  const { className, isOpen, handleClose } = props;
  return (
    <Modal
      className={classNames(cls.LoginModal, {}, [className])}
      isOpen={isOpen}
      onClose={handleClose}
      lazy
    >
      <LoginForm />
    </Modal>
  );
};
