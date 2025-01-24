import styled from "styled-components/native";

export const ModalStyled = styled.Modal``;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
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
  color: #fff;
`;

export const ScrollView = styled.ScrollView`
  margin-bottom: 40px;
`;

export const Body = styled.View`
  flex-direction: column;
  padding: 16px 8px;
`;

export const Close = styled.Pressable`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
  elevation: 1;
`;

export const Footer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 16px;
  right: 16px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;
