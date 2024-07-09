import { type StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist, type StateStorage } from "zustand/middleware";
import { logger } from "./middlewares/logger.middleware";

interface PersonState {
    firstname: string;
    lastname: string;
}
interface ActionsPersonState {
    setFirstName: (name: string) => void;
    setLastName: (name: string) => void;
}
//otra manera en ves de crear una interface con toda la informacion de una puede ser divirla, aunque en este caso no es util en otros casos de estados muy grandes puede servir, combinado tambien con slices de store.

const personStore: StateCreator<PersonState & ActionsPersonState> = (set) => ({
    firstname: "",
    lastname: "",
    setFirstName: (name) => set(() => ({ firstname: name })),
    setLastName: (name) => set(() => ({ lastname: name })),
});

//la funcion create se inicializa con () y retorna una funcion que es la que se configura por esto se ve () (set....)
const customStorage: StateStorage = {
    getItem: function (name: string): string | Promise<string | null> | null {
        return sessionStorage.getItem(name);
    },
    setItem: function (name: string, value: string): void {
        sessionStorage.setItem(name, value);
    },
    removeItem: function (name: string): void {
        sessionStorage.removeItem(name);
    },
};
const usePersonStore = create<PersonState & ActionsPersonState>()(
    //middleware persist por defecto usa el localStorage
    logger(devtools(persist(personStore, { name: "personStorage", storage: createJSONStorage(() => customStorage) })))
);
export default usePersonStore;
