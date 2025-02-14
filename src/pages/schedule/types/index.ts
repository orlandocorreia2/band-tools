import { MenuProps } from "@/src/components/menu/types";

export type ScheduleDataProps = {
  id: any;
  title: string;
  date: Date;
  dayOfWeek:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
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
