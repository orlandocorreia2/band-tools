import React, { useEffect, useMemo } from "react";
import Header from "../../components/header";
import Container from "../../components/container";
import SetlistPage from "../../pages/setists/setlist";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Alert } from "react-native";

export default function SetLists() {
  const { index } = useLocalSearchParams();
  const indexValue = useMemo(() => {
    return typeof index === "string" ? parseInt(index) : parseInt(index[0]);
  }, []);
  return (
    <>
      <Header title="Setlist" />
      <Container>
        <SetlistPage index={indexValue} />
      </Container>
    </>
  );
}
