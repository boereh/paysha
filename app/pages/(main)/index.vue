<script setup lang="ts">
import { uid } from "uid/secure";
import { safeParse } from "valibot";

const route = useRoute();
const router = useRouter();
const ledger_storage = useLedgerForage();
const ledgers = ref<Ledger[]>([]);
const loading = ref(true);

onMounted(async () => {
  for (const id of await ledger_storage.keys()) {
    const { success, output } = safeParse(
      LEDGER_SCHEMA,
      await ledger_storage.getItem(id),
    );
    if (!success || ledgers.value.find((x) => x.id === id)) continue;
    ledgers.value.push(output);
  }

  loading.value = false;
});

const isLedgerActive = computed(
  () => (ledger: Ledger) => route.params.ledgerid === ledger.id,
);

watch(ledgers, (val, prev) => {
  if (loading) return;
  for (const ledg of val) {
    const prev_idx = (prev || []).findIndex((x) => x.id === ledg.id);

    if (prev_idx < -1) ledger_storage.removeItem(ledg.id);
    else ledger_storage.setItem(ledg.id, ledg);
  }
});
</script>

<template>
  <div class="p-4">
    <div class="container mx-auto space-y-4">
      <h1 class="text-3xl font-semibold my-8">Ledgers</h1>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <template v-if="loading">
          <div
            v-for="idx in 4"
            :key="idx"
            class="bg-muted rounded-lg border border-accented p-4"
          >
            <div class="flex gap-4 mb-2">
              <div class="size-12 rounded-lg bg-accented animate-pulse"></div>
              <div class="flex-1 flex flex-col gap-2 animate-pulse">
                <div class="h-4 rounded w-full bg-accented"></div>
                <div class="h-4 rounded w-24 bg-accented"></div>
              </div>
            </div>

            <div class="h-4 w-full rounded animate-pulse bg-accented"></div>
          </div>
        </template>

        <template v-else>
          <LedgerCard
            v-for="ledger of ledgers"
            :key="ledger.id"
            :ledger="ledger"
            :active="isLedgerActive(ledger)"
            :href="`/${ledger.id}`"
            :class="[isLedgerActive(ledger) ? '' : '']"
          />

          <UButton
            color="neutral"
            variant="outline"
            size="xl"
            icon="i-ph:plus-circle"
            label="Create ledger"
            :ui="{
              base: 'h-28 rounded-xl justify-center',
            }"
            @click="
              async () => {
                const id = uid();

                await ledger_storage.setItem<Ledger>(id, {
                  accounts: [],
                  created: Date.now(),
                  updated: Date.now(),
                  id,
                  authors: [],
                  recurrings: [],
                  storage: 'local',
                  name: 'Untitled Ledger',
                  transactions: [],
                  budgets: [],
                  enable_nonpaid: true,
                  rollover: true,
                  startdayofmonth: 1,
                  startdayofweek: 'monday',
                  default_account: '',
                  categories: [],
                });

                router.push(`/${id}`);
              }
            "
          />
        </template>
      </div>
    </div>
  </div>
</template>
