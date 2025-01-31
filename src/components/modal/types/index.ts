export type ModalProps = {
  visible: boolean;
  title?: string;
  onClose?: () => void;
  onSave?: () => void;
  hideModal?: () => void;
  children: React.ReactNode;
};
