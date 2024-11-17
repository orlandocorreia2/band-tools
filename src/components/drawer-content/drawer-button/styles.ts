import styled from "styled-components/native";

export const PressableStyled = styled.Pressable`
  padding-bottom: 16;
`;

type TitleProps = {
  isFocused: boolean;
};

export const Title = styled.Text<TitleProps>`
  font-size: 20;
  color: ${({ isFocused }) => isFocused && "#727D98"};
`;
