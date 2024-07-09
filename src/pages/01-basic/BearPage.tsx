import { useShallow } from "zustand/react/shallow";
import { WhiteCard } from "../../components";
import useBearerStore from "../../store/bearer.store";

export const BearPage = () => {
    const blackBears = useBearerStore((state) => state.blackBears);
    const increaseBlackBears = useBearerStore((state) => state.increaseBlackBears);
    const bears = useBearerStore((state) => state.bears);
    const doNothing = useBearerStore(useShallow((state) => state.doNothing));
    const addBear = useBearerStore(useShallow((state) => state.addBear));
    const clearBears = useBearerStore(useShallow((state) => state.clearBears));
    return (
        <>
            <h1>Contador de Osos</h1>
            <p>Manejo de estado simple de Zustand</p>
            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <WhiteCard centered>
                    <h2>Osos Negros</h2>

                    <div className="flex flex-col md:flex-row">
                        <button
                            onClick={() => {
                                increaseBlackBears(+1);
                            }}
                        >
                            +1
                        </button>
                        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
                        <button
                            onClick={() => {
                                increaseBlackBears(-1);
                            }}
                        >
                            -1
                        </button>
                    </div>
                </WhiteCard>

                <WhiteCard centered>
                    <h2>Osos Polares</h2>

                    <div className="flex flex-col md:flex-row">
                        <button> +1</button>
                        <span className="text-3xl mx-2 lg:mx-10"> 0 </span>
                        <button>-1</button>
                    </div>
                </WhiteCard>

                <WhiteCard centered>
                    <h2>Osos Pandas</h2>

                    <div className="flex flex-col md:flex-row">
                        <button> +1</button>
                        <span className="text-3xl mx-2 lg:mx-10"> 0 </span>
                        <button>-1</button>
                    </div>
                </WhiteCard>

                <WhiteCard>
                    <h2>Osos</h2>
                    <button onClick={doNothing}>DoNothing</button>
                    <button onClick={addBear}>Agregar Oso</button>
                    <button onClick={clearBears}>Limpiar lista</button>
                    <pre>{JSON.stringify(bears, null, 2)}</pre>
                </WhiteCard>
            </div>
        </>
    );
};
