import styled from "styled-components/native";

export const PressableStyled = styled.Pressable`
  margin-bottom: 24px;
  flex-direction: row;
  align-items: center;
`;

type TitleProps = {
  isFocused: boolean;
};

export const Title = styled.Text<TitleProps>`
  font-size: 20px;
  color: ${({ isFocused }) => (isFocused ? "#999999" : "#FFFFFF")};
`;
