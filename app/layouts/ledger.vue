<script setup lang="ts">
import dayjs from "dayjs";
import { safeParse } from "valibot";
import relative_time from "dayjs/plugin/relativeTime";
import { watchDebounced } from "@vueuse/core";

dayjs.extend(relative_time);

const route = useRoute();
const router = useRouter();
const ledger_state = useLedgerState();
const create_transaction = useCreateTransactionState();

onMounted(async () => {
    if (ledger_state.value.ledger) return (ledger_state.value.loading = false);
    if (!route.params.ledgerid) return;
    const result = await useLedgerForage().getItem(
        route.params.ledgerid as string,
    );
    const { success, output } = safeParse(LEDGER_SCHEMA, result);
    if (!success) return router.push("/");
    ledger_state.value.ledger = output;
    ledger_state.value.loading = false;
    create_transaction.value.account =
        ledger_state.value.ledger.default_account;
});

const { pause, resume } = watchDebounced(
    ledger_state,
    async ({ ledger }) => {
        if (!ledger || !route.params.ledgerid) return;
        const now = Date.now();
        pause();
        ledger_state.value.ledger!.updated = now;
        await useLedgerForage().setItem(route.params.ledgerid as string, {
            ...ledger,
            updated: now,
        });
        resume();
    },
    { immediate: false },
);

effect(() => {
    if (typeof document === "undefined") return;
    document.body.classList[create_transaction.value.dialog ? "add" : "remove"](
        "overflow-hidden",
    );
});

useSeoMeta({
    title: "paysha",
});
</script>

<template>
    <Navigation />

    <slot />

    <CreateTransactionDialog />
</template>

<style>
@media (width <= 40rem) {
    html,
    body {
        padding-bottom: calc(var(--spacing) * 16 + 1px);
    }
}
</style>
