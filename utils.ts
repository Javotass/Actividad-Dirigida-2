import { ModeloVuelo, Vuelo } from "./types.ts";

export const transformarModeloAVuelo = (modeloVuelo: ModeloVuelo): Vuelo => {
  return {
    id: modeloVuelo._id!.toString(),
    origen: modeloVuelo.origen,
    destino: modeloVuelo.destino,
    fechaYHora: modeloVuelo.fechaYHora,
  };
};
