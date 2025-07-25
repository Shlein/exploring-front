import { Mods, classNames } from 'shared/lib/classNames/classNames';
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { Portal } from 'shared/ui/Portal';
import { useTheme } from 'app/providers/ThemeProvider';

import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = ({
  className,
  children,
  isOpen,
  lazy = false,
  onClose
}: ModalProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setIsMounted(true);
  }, [isOpen]);

  const { theme } = useTheme();

  const closeHandler = useCallback(() => {
    setIsClosing(true);
    if (onClose) {
      onClose();
      timerRef.current = setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, ANIMATION_DELAY);
    }
  }, [onClose, isClosing]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  };

  if (lazy && !isMounted) return null;

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div
            className={cls.content}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
