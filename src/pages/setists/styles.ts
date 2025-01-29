import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 8px;
  background: #35363a;
`;

export const NoContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: transparent;
`;

export const Version = styled.Text`
  font-size: 12px;
  color: #cccccc;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #cccccc;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: center;
`;

export const Info = styled.Text`
  font-size: 18px;
  color: #cccccc;
`;
