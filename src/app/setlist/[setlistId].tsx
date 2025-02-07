import React from "react";
import Header from "../../components/header";
import Container from "../../components/container";
import SetlistPage from "../../pages/setists/setlist";
import { useLocalSearchParams } from "expo-router/build/hooks";
import Loading from "@/src/components/loading";
import { SafeAreaView } from "@/src/components/styles/styles";

export default function SetLists() {
  const { setlistId } = useLocalSearchParams();

  if (!setlistId) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <Header title="Setlist" />
      <Container>
        <SetlistPage
          setlistId={typeof setlistId === "string" ? setlistId : setlistId[0]}
        />
      </Container>
    </SafeAreaView>
  );
}
