import { InputProps } from "./types";
import { Container, TextInput, Title } from "./styles";

export default function Input({
  title,
  value,
  onChangeText,
  keyboardType = "default",
  multiline = false,
}: InputProps) {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </Container>
  );
}
