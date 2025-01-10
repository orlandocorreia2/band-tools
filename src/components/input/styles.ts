import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  color: #fff;
`;

type TextInputProps = {
  multiline: boolean;
};

export const TextInput = styled.TextInput<TextInputProps>`
  width: 100%;
  height: ${({ multiline }) => (multiline ? 150 : 50)}px;
  background-color: #fff;
  flex: 1;
`;
