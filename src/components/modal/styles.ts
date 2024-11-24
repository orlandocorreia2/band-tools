import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const ModalStyled = styled.Modal``;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

export const Containt = styled.View`
  width: 90%;
  height: 90%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  box-shadow: 20px 20px 60px yellow;
  padding: 16px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 22px;
`;

export const Close = styled.Pressable`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
  elevation: 1;
`;

export const Icon = styled(Feather)`
  color: rgba(0, 0, 0, 0.4);
  font-size: 18px;
`;
