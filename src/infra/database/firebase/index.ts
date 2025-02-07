import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  child,
  push,
  remove,
} from "firebase/database";
import { GetRealTimeProps, SaveProps } from "./types";

initializeApp(firebaseConfig);

const db = getDatabase();

export const findAll = async ({ key, fn }: GetRealTimeProps) => {
  const reference = ref(db);
  const snapshot = await get(child(reference, key));
  const data: any[] = [];
  snapshot.forEach((snap: any) => {
    data.push({ ...snap.val(), id: snap.key });
  });
  fn(data);
};

export const save = async ({ key, data }: SaveProps) => {
  const reference = ref(db, key);
  return await set(reference, data);
};

export const add = async ({ key, data }: SaveProps) => {
  const reference = ref(db, key);
  return await push(reference, data);
};

export const del = async ({ key, data }: SaveProps) => {
  const reference = ref(db, key);
  return await remove(reference);
};

export const getRealTime = ({ key, fn }: GetRealTimeProps) => {
  const reference = ref(db, key);
  onValue(reference, (snapshot) => {
    const data = snapshot.val() || [];
    fn(data);
  });
};
