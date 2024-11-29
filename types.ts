import { OptionalId } from "mongodb";

export type ModeloVuelo = OptionalId<{
  origen: string;
  destino: string;
  fechaYHora: string;
}>;

export type Vuelo = {
  id: string;
  origen: string;
  destino: string;
  fechaYHora: string;
};
