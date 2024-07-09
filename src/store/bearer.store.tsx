import { create } from "zustand";

interface Bear {
    id: number;
    name: string;
}
interface BearerState {
    blackBears: number;
    polarBears: number;
    pandaBears: number;
    bears: Array<Bear>;
    increaseBlackBears: (by: number) => void;
    doNothing: () => void;
    addBear: () => void;
    clearBears: () => void;
}
//la funcion create se inicializa con () y retorna una funcion que es la que se configura por esto se ve () (set....)
const useBearerStore = create<BearerState>()((set) => ({
    blackBears: 0,
    polarBears: 0,
    pandaBears: 0,
    bears: [{ id: 1, name: "Jaimito" }],
    increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
    doNothing: () => set((state) => ({ bears: [...state.bears] })),
    addBear: () =>
        set((state) => ({
            bears: [...state.bears, { id: state.bears.length + 1, name: `Oso ${state.bears.length + 1}` }],
        })),
    clearBears: () => set(() => ({ bears: [] })),
}));
export default useBearerStore;
