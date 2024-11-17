import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { GetRealTimeProps } from "./types";

initializeApp(firebaseConfig);

const db = getDatabase();

export const save = async (key: string, data: any) => {
  const reference = ref(db, key);
  return await set(reference, data);
};

export const getRealTime = ({ key, fn }: GetRealTimeProps) => {
  const reference = ref(db, key);
  onValue(reference, (snapshot) => {
    let data: any[] = [];
    const snapshotVal = snapshot.val();
    snapshotVal?.forEach((snapVal: any) => {
      data.push(snapVal);
    });
    fn(data);
  });
};
