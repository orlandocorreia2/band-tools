import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: center;
  right: 0;
  height: 85%;
  width: 32px;
  z-index: 1;
`;

export const Content = styled.View`
  position: absolute;
  background: #fff;
  width: 100px;
  right: 32px;
  top: 24px;
  padding: 12px;
  gap: 16px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 100%;
`;

export const Separator = styled.View`
  width: 120%;
  margin-left: -8px;
  height: 2px;
  background-color: #999;
  margin-bottom: 12px;
`;

export const MenuItemContainer = styled.View`
  flex: 1;
`;

type MenuItemTextProps = { color?: string; fontSize?: number };
export const MenuItemText = styled.Text<MenuItemTextProps>`
  color: ${({ color }) => color ?? "#000"};
  font-size: ${({ fontSize }) => fontSize ?? 16}px;
`;
