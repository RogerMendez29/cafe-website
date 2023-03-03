import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";
import { async } from "q";

// Saving new Item
export const saveItem = async (data, category) => {
  console.log(category);
  console.log(data);

  await setDoc(doc(firestore, `foodItems`, `${Date.now()}`), data, {
    merge: true,
  });
};

// getall food items
export const getAllFoodItems = async () => {
  let appetizers = await getAppetizers();
  let entrees = await getEntrees();
  let sandwiches = await getSandwiches();
  let desserts = await getDesserts();
  let sides = await getSides();

  let AllItems = appetizers
    .concat(entrees)
    .concat(sandwiches)
    .concat(sides)
    .concat(desserts);
  console.log();

  return AllItems;
};
export const getAppetizers = async () => {
  const items = await getDocs(
    query(collection(firestore, "Appetizers"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};

export const getEntrees = async () => {
  const items = await getDocs(
    query(collection(firestore, "Entrees"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};

export const getDesserts = async () => {
  const items = await getDocs(
    query(collection(firestore, "Desserts"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};

export const getSandwiches = async () => {
  const items = await getDocs(
    query(collection(firestore, "Sandwichs"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};

export const getSides = async () => {
  const items = await getDocs(
    query(collection(firestore, "Sides"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};
