import { LEDGER_SCHEMA, type Ledger } from "./schemas";
import { createStorage } from "unstorage";
import localstorage from "unstorage/drivers/localstorage";
import { safeParse } from "valibot";
import localforage from "localforage";

export function useLedgerStore() {
  return localforage.createInstance({ name: "paysha", storeName: "ledgers" });
}

export const useCurrentId = () => useState("current-id", () => "");
export function useCurrentLedger() {
  return useState<Ledger | undefined>("current-ledger", () => undefined);
}

// export function useLedgerStore() {
// 	return createStorage<Ledger>({
// 		driver: idb({ dbName: 'paysha', storeName: 'ledgers' }),
// 	});
// }

// export function createPersistedCurrentId() {
//   return new PersistedState<string | undefined>("paysha:current", undefined);
// }
//

// export function useCurrentLedger() {
//   const ledger = ref<Ledger>();
//   const id = useCurrentId();

//   if (typeof document !== "undefined") {
//     const store = useLedgerStore();
//   }

//   return { ledger, id };
// }

// export class CurrentLedger {
//   private ledger = $state<Ledger>();
//   private _id = createPersistedCurrentId();
//   private storage = useLedgerStore();
//   // private subscriber: ReturnType<typeof createSubscriber>;

//   constructor() {
//     resource(
//       () => this._id.current,
//       async (id) => {
//         if (!id) return (this.ledger = undefined);
//         const { success, output } = safeParse(
//           LEDGER_SCHEMA,
//           await this.storage.getItem(id),
//         );
//         if (!success) return (this.ledger = undefined);
//         this.ledger = output;
//       },
//     );
//   }
//   get current() {
//     return this.ledger;
//   }
//   set current(ledger: Ledger | undefined) {
//     if (!ledger) return;
//     this.storage.setItem(ledger.id, ledger);
//     this.ledger = ledger;
//   }
//   get id() {
//     return this._id.current;
//   }
//   set id(id: string | undefined) {
//     this._id.current = id;
//   }
// }

// export function useCurrentLedger() {
//   const id = createPersistedCurrentId();

//   return resource(
//     () => id.current,
//     async (v) => {
//       if (!v) return;
//       const { success, output } = safeParse(
//         LEDGER_SCHEMA,
//         await useLedgerStore().getItem(v),
//       );
//       if (!success) return;
//       return output;
//     },
//   );
// }

// export async function getCurrentLedger() {
//   // IF AUTH
//   const auth = false;
//   if (auth) {
//     // TODO
//   }

//   if (browser) {
//     const current = await useLocalStorage().get<string>("current");
//     if (!current) return;

//     const { success, output } = safeParse(
//       LEDGER_SCHEMA,
//       await useLedgerStore().getItem(current),
//     );
//     if (success) return output;
//   }
// }
