import { CardProps } from "./types";

import {
  Header,
  Container,
  Title,
  Content,
  ContentInfo,
  ScrollView,
} from "./styles";

export default function Card({ title, informations }: CardProps) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>
        {informations.length > 1 ? (
          <ScrollView>
            {informations.map((information, index) => (
              <ContentInfo key={`card-content-info-${index}`}>
                {information}
              </ContentInfo>
            ))}
          </ScrollView>
        ) : (
          informations.map((information, index) => (
            <ContentInfo key={`card-content-info-${index}`}>
              {information}
            </ContentInfo>
          ))
        )}
      </Content>
    </Container>
  );
}
