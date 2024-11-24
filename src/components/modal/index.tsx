import { ModalStyled, Container, Containt, Title, Close, Icon } from "./styles";
import { ModalProps } from "./types";

export default function Modal({
  visible,
  title = "Modal",
  onClose,
}: ModalProps) {
  return (
    <ModalStyled visible={visible} animationType="slide">
      <Container>
        <Containt>
          <Close onPress={onClose}>
            <Icon name="x" />
          </Close>
          <Title>{title}</Title>
        </Containt>
      </Container>
    </ModalStyled>
  );
}
