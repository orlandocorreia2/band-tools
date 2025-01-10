export type ModalProps = {
  visible: boolean;
  title?: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
};
