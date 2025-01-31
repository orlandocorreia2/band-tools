import { Icon } from "@/src/shared/styles";
import Button from "../button";
import {
  ModalStyled,
  Container,
  Containt,
  Title,
  ScrollView,
  Close,
  Body,
  Footer,
} from "./styles";
import { ModalProps } from "./types";

export default function Modal({
  visible,
  title = "Modal",
  onClose,
  onSave,
  hideModal = () => {},
  children,
}: ModalProps) {
  return (
    <ModalStyled visible={visible} animationType="slide">
      <Container>
        <Containt>
          <Close onPress={onClose || hideModal}>
            <Icon name="x" color="#fff" />
          </Close>
          <Title>{title}</Title>
          <ScrollView>
            <Body>{children}</Body>
          </ScrollView>
          <Footer>
            {typeof onClose == "function" && (
              <Button title="Cancelar" onPress={onClose} color="red" />
            )}
            {typeof onSave == "function" && (
              <Button
                title="Salvar"
                onPress={onSave}
                onPressOut={hideModal}
                color="green"
              />
            )}
          </Footer>
        </Containt>
      </Container>
    </ModalStyled>
  );
}
