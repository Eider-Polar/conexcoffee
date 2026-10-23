import { IS_DEMO_MODE } from './env';
import api from './axios';

// ============================================
// createResourceApi — Fábrica de servicios CRUD
// ============================================
// Capa de servicios (API) de un recurso REST. Las pages/hooks NUNCA llaman a
// axios directamente; usan los servicios creados con esta fábrica.
//
//   export const fincasApi = createResourceApi({
//     path: '/caficultor/fincas',   // endpoint REST real
//     seed: INITIAL_CAFICULTOR_FINCAS, // datos mock (solo modo demo)
//   });
//
// MODO DEMO (sin backend): opera sobre una colección en memoria con latencia
// simulada, para que la UI ya funcione con el mismo contrato que tendrá la API
// (list / get / create / update / remove). Con VITE_ENABLE_DEMO=false llama al
// backend real vía `src/lib/axios.js`. Al integrar el backend basta con quitar
// el `seed`; ni las pages ni los hooks cambian.
//
// Contrato REST esperado:
//   GET    {path}        → Item[]
//   GET    {path}/:id    → Item
//   POST   {path}        → Item
//   PUT    {path}/:id    → Item
//   DELETE {path}/:id    → void
// ============================================

const MOCK_LATENCY_MS = 250;
const wait = (ms = MOCK_LATENCY_MS) => new Promise((resolve) => setTimeout(resolve, ms));
const clone = (value) => structuredClone(value);

export function createResourceApi({ path, seed = [], idKey = 'id' }) {
  // Colección en memoria (solo modo demo). Se copia para no mutar el seed.
  let collection = clone(seed);

  const notFound = () => {
    const error = new Error('Recurso no encontrado');
    error.response = { status: 404, data: { message: 'Recurso no encontrado' } };
    return error;
  };

  return {
    async list(params) {
      if (IS_DEMO_MODE) {
        await wait();
        return clone(collection);
      }
      const { data } = await api.get(path, { params });
      return data;
    },

    async get(id) {
      if (IS_DEMO_MODE) {
        await wait();
        const item = collection.find((i) => i[idKey] === id);
        if (!item) throw notFound();
        return clone(item);
      }
      const { data } = await api.get(`${path}/${id}`);
      return data;
    },

    async create(payload) {
      if (IS_DEMO_MODE) {
        await wait();
        const item = { ...clone(payload), [idKey]: payload[idKey] ?? `demo-${Date.now()}` };
        collection = [item, ...collection];
        return clone(item);
      }
      const { data } = await api.post(path, payload);
      return data;
    },

    async update(payload) {
      const id = payload[idKey];
      if (IS_DEMO_MODE) {
        await wait();
        if (!collection.some((i) => i[idKey] === id)) throw notFound();
        collection = collection.map((i) => (i[idKey] === id ? { ...i, ...clone(payload) } : i));
        return clone(collection.find((i) => i[idKey] === id));
      }
      const { data } = await api.put(`${path}/${id}`, payload);
      return data;
    },

    async remove(id) {
      if (IS_DEMO_MODE) {
        await wait();
        collection = collection.filter((i) => i[idKey] !== id);
        return;
      }
      await api.delete(`${path}/${id}`);
    },
  };
}
