<script setup lang="ts">
import dayjs from "dayjs";
import relative_time from "dayjs/plugin/relativeTime";
import LogoIcon from "./logo-icon.vue";

dayjs.extend(relative_time);

const route = useRoute();
const ledger_state = useLedgerState();
const create_transaction = useCreateTransactionState();

const NAV_LINKS = computed(() => [
  { href: `/${route.params.ledgerid}`, label: "Home", icon: LogoIcon },
  {
    href: `/${route.params.ledgerid}/accounts`,
    label: "Accounts",
    icon: "i-ph:bank",
  },
  {
    href: `/${route.params.ledgerid}/transactions`,
    label: "Transactions",
    icon: "i-ph:receipt",
  },
  {
    href: `/${route.params.ledgerid}/budgets`,
    label: "Budgets",
    icon: "i-ph:piggy-bank",
  },
]);

// const date_range_label = computed(() => {
//   const day = dayjs(ledger_state.value.date);
//   const formats: Record<LedgerState["range"], string> = {
//     year: day.format("YYYY"),
//     biennial: `${day.isBefore(day.month(7).date(1)) ? "Jan - Jun" : "Jul - Dec"} ${day.format("YYYY")}`,
//     quarter: day.format("MMMM YYYY"),
//     bimonth: `${day.subtract(1, "month").format("MMMM")} - ${day.format("MMMM")}`,
//     month: day.format("MMMM YYYY"),
//     biweek: day.format("MMMM YYYY"),
//     week: day.format("MMMM "),
//     day: dayjs().isSame(day) ? "Today" : day.format("MMM D, YYYY"),
//   };
//   return formats[ledger_state.value.range];
// });
</script>

<template>
  <nav
    class="top-0 sm:(sticky z-10 border-surface-accented) p-4 bg-inverted/75 backdrop-blur-2xl flex items-center justify-between gap-2 border-b border-transparent"
  >
    <!-- DATE SELECTOR -->
    <div class="flex items-center gap-1">
      <UButton
        size="xs"
        icon="i-ph:caret-left"
        color="neutral"
        variant="ghost"
        @click="
          () => {
            const day = dayjs(ledger_state.date);
            const options: Record<LedgerState['range'], dayjs.Dayjs> = {
              biennial: day.subtract(6, 'month'),
              bimonth: day.subtract(2, 'month'),
              biweek: day.subtract(2, 'week'),
              day: day.subtract(1, 'day'),
              month: day.subtract(1, 'month'),
              quarter: day.subtract(3, 'month'),
              week: day.subtract(1, 'week'),
              year: day.subtract(1, 'year'),
            };
            ledger_state.date = options[ledger_state.range].toDate();
          }
        "
      />

      <Button label="{date_range_label}" variant="ghost" color="surface" />

      <UButton
        size="xs"
        icon="i-ph:caret-right"
        color="neutral"
        variant="ghost"
        @click="
          () => {
            const day = dayjs(ledger_state.date);
            const options: Record<LedgerState['range'], dayjs.Dayjs> = {
              biennial: day.add(6, 'month'),
              bimonth: day.add(2, 'month'),
              biweek: day.add(2, 'week'),
              day: day.add(1, 'day'),
              month: day.add(1, 'month'),
              quarter: day.add(3, 'month'),
              week: day.add(1, 'week'),
              year: day.add(1, 'year'),
            };
            ledger_state.date = options[ledger_state.range].toDate();
          }
        "
      />
    </div>

    <a v-if="ledger_state.ledger" :href="`/${ledger_state.ledger.id}/settings`">
      <img
        class="size-8 rounded-lg"
        src="https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURI(ledger.current.id)}"
        alt="{ledger.current.name}"
      />
    </a>
  </nav>

  <nav
    :class="[
      'fixed p-4 left-0 right-0 z-11 bg-red',
      'sm:(top-0 pointer-events-none)',
      '<sm:(bottom-0 bg-inverted/75 backdrop-blur-lg border-t border-surface-accented)',
    ]"
  >
    <div
      class="grid grid-cols-5 grid-rows-1 gap-2 max-w-sm mx-auto pointer-events-auto w-full"
    >
      <a
        v-for="(link, idx) of NAV_LINKS"
        :key="link.href"
        :href="link.href"
        :class="[
          'flex flex-col items-center justify-center gap-1 transition relative h-8',
          route.path === link.href ? 'text-primary-500' : 'text-muted',
        ]"
        :title="link.label"
        :style="{ gridColumn: idx > 1 ? idx + 2 : idx + 1 }"
      >
        <UIcon
          :name="link.icon"
          :class="[
            'transition-all absolute',
            link.label === 'Home' ? 'size-5' : 'size-6',
            route.path === link.href ? 'mb-4 text-transparent' : '',
          ]"
        />

        <span
          :class="[
            'text-xs tracking-wide transition-all top-8 font-medium',
            route.path === link.href ? '' : 'text-transparent',
          ]"
        >
          {{ link.label }}
        </span>
      </a>

      <span class="col-3 row-1 relative">
        <button
          class="absolute left-1/2 -translate-1/2 size-12 bg-primary text-white rounded-full grid place-items-center top-1/2 hover:bg-primary-400 transition"
          @click="
            () => {
              create_transaction.dialog = true;
              create_transaction.date = new Date();
            }
          "
        >
          <UIcon name="i-ph:plus-bold" class="size-5" />
        </button>
      </span>
    </div>
  </nav>
</template>
