import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase, ref, set, onValue, get, child } from "firebase/database";
import { GetRealTimeProps } from "./types";

initializeApp(firebaseConfig);

const db = getDatabase();

export const findAll = async ({ key, fn }: GetRealTimeProps) => {
  const reference = ref(db);
  const snapshot = await get(child(reference, key));
  const data = snapshot.val();
  fn(data);
};

export const save = async (key: string, data: any) => {
  const reference = ref(db, key);
  return await set(reference, data);
};

export const getRealTime = ({ key, fn }: GetRealTimeProps) => {
  const reference = ref(db, key);
  onValue(reference, (snapshot) => {
    const data = snapshot.val();
    fn(data);
  });
};
