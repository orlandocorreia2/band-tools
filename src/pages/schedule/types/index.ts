import { MenuProps } from "@/src/components/menu/types";

export type ScheduleDataProps = {
  id: any;
  title: string;
  date: Date;
  startHour: Date;
  endHour: Date;
  phone: string;
  phone2?: string;
  address: string;
  showFee: number;
  observations?: string;
};

export type MusicComponentProps = {
  id: string;
  title: string;
  actions: MenuProps["actions"];
};
