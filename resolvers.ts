import { Collection, ObjectId } from "mongodb";
import { ModeloVuelo, Vuelo } from "./types.ts";
import { transformarModeloAVuelo } from "./utils.ts";

export const resolvers = {
  Query: {
    getFlights: async (
      _: unknown,
      args: { origen: string; destino: string },
      context: { ColeccionVuelos: Collection<ModeloVuelo> }): Promise<Vuelo[]> =>
     {
      const { origen, destino } = args;

      const filtro: { origen?: string; destino?: string } = {};
      if (origen) {
        filtro.origen = origen;
      }
      if (destino) {
        filtro.destino = destino;
      }

      const modelosVuelos = await context.ColeccionVuelos.find(filtro).toArray();
      return modelosVuelos.map(transformarModeloAVuelo);
     },

    getFlight: async (
      _: unknown,
      args: { id: string },
      context: { ColeccionVuelos: Collection<ModeloVuelo> }): Promise<Vuelo | null> => 

     {
      const modeloVuelo = await context.ColeccionVuelos.findOne({
        _id: new ObjectId(args.id),
      });
      return modeloVuelo ? transformarModeloAVuelo(modeloVuelo) : null;

     },
  },

  Mutation: {
    addFlight: async (
      _: unknown,
      args: { origen: string; destino: string; fechaYHora: string },
      context: { ColeccionVuelos: Collection<ModeloVuelo> } ): Promise<Vuelo> => 
        
    {
      const { origen, destino, fechaYHora } = args;

      const { insertedId } = await context.ColeccionVuelos.insertOne({
        origen,
        destino,
        fechaYHora,
      });

      const modeloVuelo = {
        _id: insertedId,
        origen,
        destino,
        fechaYHora,
      };

      return transformarModeloAVuelo(modeloVuelo);
    },
  },
};
