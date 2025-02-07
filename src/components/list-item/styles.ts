import styled from "styled-components/native";

type ContainerProps = {
  isActive: boolean;
  zIndex: number;
};

export const Container = styled.TouchableOpacity<ContainerProps>`
  background: rgba(32, 33, 36, 1);
  width: 100%;
  padding: 16px;
  align-items: center;
  border-radius: 16px;
  margin-bottom: 12px;
  box-shadow: 10px 5px 5px black;
  z-index: ${({ zIndex }) => zIndex};
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #cccccc;
  font-weight: bold;
`;
