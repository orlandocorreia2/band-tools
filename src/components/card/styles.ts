import styled from "styled-components/native";

export const Container = styled.View`
  width: auto;
  max-height: 400;
  margin-bottom: 16;
  border: 3px;
  background-color: #fff;
  padding-bottom: 8;
`;

export const Header = styled.View`
  width: 100%;
  height: 30%;
  background-color: black;
  justify-content: center;
  margin-bottom: 8;
`;

export const Title = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: 600;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ScrollView = styled.ScrollView.attrs({ centerContent: true })`
  flex: 1;
  padding-inline: 5;
`;

type ContentInfoProps = {
  fontSize?: number;
};
export const ContentInfo = styled.Text<ContentInfoProps>`
  color: #000;
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize || 22};
`;
