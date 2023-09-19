import { Instance, onSnapshot, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { QuestionStore } from "./QuestionStore";

const RootModel = types.model({
  questionStore: QuestionStore,
});

let initialState = RootModel.create({
  questionStore: {
    questions: [],
    state: 'pending',
    uploadState: 'pending',
  },
});

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
});

export type RootInstance = Instance<typeof RootModel>;

const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useStore() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Add a context provider");
  }
  return store;
}