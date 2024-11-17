import { ContainerProps } from "@/src/types";
import React from "react";
import { View } from "react-native";

export default function Container({ children }: ContainerProps) {
  return <View style={{ flex: 1, padding: 8 }}>{children}</View>;
}
