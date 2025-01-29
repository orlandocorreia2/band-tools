import { MenuProps } from "@/src/components/menu/types";

export type MusicDataProps = {
  id: string;
  title: string;
  tone: string;
  tunning: string;
  bpm: number;
  totalTimeInSeconds: number;
  timeSignature: string;
  lyrics: string;
  observation: string;
  order: number;
};

export type MusicComponentProps = {
  id: string;
  title: string;
  actions: MenuProps["actions"];
};
