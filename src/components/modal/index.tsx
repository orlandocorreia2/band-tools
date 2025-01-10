import Button from "../button";
import {
  ModalStyled,
  Container,
  Containt,
  Title,
  ScrollView,
  Close,
  Icon,
  Body,
  Footer,
} from "./styles";
import { ModalProps } from "./types";

export default function Modal({
  visible,
  title = "Modal",
  onClose,
  onSave,
  children,
}: ModalProps) {
  return (
    <ModalStyled visible={visible} animationType="slide">
      <Container>
        <Containt>
          <Close onPress={onClose}>
            <Icon name="x" />
          </Close>
          <Title>{title}</Title>
          <ScrollView>
            <Body>{children}</Body>
          </ScrollView>
          <Footer>
            <Button
              title="Cancelar"
              onPress={onClose}
              borderColor="#ccc"
              color="red"
            />
            <Button
              title="Salvar"
              onPress={onSave}
              borderColor="#ccc"
              color="green"
            />
          </Footer>
        </Containt>
      </Container>
    </ModalStyled>
  );
}
