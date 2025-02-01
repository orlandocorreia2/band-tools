import { MenuProps } from "@/src/components/menu/types";
import { MusicDataProps } from "../setlist/types";

export type SetlistDataProps = {
  id: any;
  title: string;
  order: number;
  musics?: MusicDataProps[];
};

export type MusicComponentProps = {
  id: string;
  title: string;
  actions: MenuProps["actions"];
};
