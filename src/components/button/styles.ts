import styled from "styled-components/native";

export const Container = styled.View``;

export const Title = styled.Text`
  text-align: center;
  font-weight: 600;
  color: #fff;
`;

type PressableStyledProps = {
  color: string;
};

export const PressableStyled = styled.Pressable<PressableStyledProps>`
  flex: 1;
  height: 40px;
  background-color: ${({ color }) => color};
  align-items: center;
  justify-content: center;
`;
