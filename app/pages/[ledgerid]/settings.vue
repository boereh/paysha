<script setup lang="ts">
import { safeParse } from "valibot";

const route = useRoute();
const router = useRouter();
const ledger_state = useLedgerState();
const ledgers = ref<Ledger[]>([]);
let delete_confirm = ref(false);

onMounted(async () => {
  const storage = useLedgerForage();

  for (const id of await storage.keys()) {
    const { success, output } = safeParse(
      LEDGER_SCHEMA,
      await storage.getItem(id),
    );
    if (!success || ledgers.value.find((x) => x.id === id)) continue;
    ledgers.value.push(output);
  }
});

const isLedgerActive = computed(
  () => (ledger: Ledger) => route.params.ledgerid === ledger.id,
);
</script>

<template>
  <div class="p-4">
    <div class="container mx-auto space-y-4">
      <div class="flex items-center justify-between py-4">
        <h1 class="text-4xl font-bold">Settings</h1>
      </div>

      <h2 class="text-xl font-medium mt-8">Change Ledger</h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        <LedgerCard
          v-for="ledger of ledgers"
          :key="ledger.id"
          :ledger="ledger"
          :active="isLedgerActive(ledger)"
        />

        <UButton
          color="neutral"
          variant="outline"
          size="xl"
          icon="i-ph:squares-four"
          label="View all"
          :ui="{ base: 'h-28 p-2 rounded-xl justify-center border-dashed' }"
          href="/"
        />
      </div>

      <h2 class="text-xl font-medium mt-8">General</h2>

      <div
        class="p-4 border rounded-lg border-surface-accented bg-surface-muted grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        <template v-if="ledger_state.ledger">
          <div>
            <label for="ledger-id">Ledger ID</label>

            <input
              id="ledger-id"
              bind:value="{ledger.current.id}"
              disabled
              class="mt-2 flex h-10 px-2 rounded border border-surface-accented bg-white cursor-not-allowed w-full opacity-75"
            />
          </div>

          <div>
            <label for="ledger-id">Ledger Name</label>

            <input
              id="ledger-id"
              v-model="ledger_state.ledger.name"
              class="mt-2 flex h-10 px-2 rounded border border-surface-accented bg-white w-full"
            />
          </div>
        </template>
      </div>

      <div
        class="p-4 border rounded-lg border-surface-accented space-y-4 bg-surface-muted mt-8"
      >
        <h2 class="text-xl font-medium">Danger Zone</h2>

        <p class="text-muted">
          Be careful what you do here! This action will delete your ledger
          entirely, including all data associated with it.
        </p>

        <UButton
          label="Delete Ledger"
          color="error"
          icon="i-ph:info"
          @click="() => void (delete_confirm = true)"
        />
      </div>
    </div>
  </div>
  <UDialog v-model:open="delete_confirm">
    <h1 class="text-lg font-semibold flex-1">Delete confirm</h1>

    <p>
      Confirm you still want to delete this ledger. This action is irrevirsible.
    </p>

    <table>
      <tbody>
        <tr>
          <td>ID</td>
          <td>{{ ledger_state.ledger?.id }}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{{ ledger_state.ledger?.name }}</td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-end">
      <UButton
        label="Delete"
        color="error"
        @click="
          async () => {
            if (!route.params.ledgerid) return;
            await useLedgerForage().removeItem(route.params.ledgerid as string);
            router.push('/');
          }
        "
      />
    </div>
  </UDialog>
</template>
