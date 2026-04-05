<script lang="ts">
	import { page } from '$app/state';
	import LogoIcon from '$lib/components/logo-icon.svelte';
	import { Button, Icon } from 'uisv';
	import dayjs from 'dayjs';
	import relative_time from 'dayjs/plugin/relativeTime';
	import { useCreateTransaction, useLedgerContext } from '$lib/contexts';

	dayjs.extend(relative_time);

	const ledger = useLedgerContext();
	const create_transaction = useCreateTransaction();

	const NAV_LINKS = [
		{ href: `/${page.params.ledgerid}`, label: 'Home', icon: LogoIcon },
		{
			href: `/${page.params.ledgerid}/accounts`,
			label: 'Accounts',
			icon: 'i-ph:bank',
		},
		{
			href: `/${page.params.ledgerid}/transactions`,
			label: 'Transactions',
			icon: 'i-ph:receipt',
		},
		{
			href: `/${page.params.ledgerid}/budgets`,
			label: 'Budgets',
			icon: 'i-ph:piggy-bank',
		},
	];

	const date_range_label = $derived.by(() => {
		const day = dayjs(ledger.date);
		const formats: Record<(typeof ledger)['range'], string> = {
			year: day.format('YYYY'),
			biennial: `${day.isBefore(day.month(7).date(1)) ? 'Jan - Jun' : 'Jul - Dec'} ${day.format('YYYY')}`,
			quarter: day.format('MMMM YYYY'),
			bimonth: `${day.subtract(1, 'month').format('MMMM')} - ${day.format('MMMM')}`,
			month: day.format('MMMM YYYY'),
			biweek: day.format('MMMM YYYY'),
			week: day.format('MMMM '),
			day: dayjs().isSame(day) ? 'Today' : day.format('MMM D, YYYY'),
		};
		return formats[ledger.range];
	});
</script>

<nav
	class="top-0 sm:(sticky z-10 border-surface-accented) p-4 bg-inverted/75 backdrop-blur-2xl flex items-center justify-between gap-2 border-b border-transparent"
>
	<!-- DATE SELECTOR -->
	<div class="flex items-center gap-1">
		<Button
			size="xs"
			icon="i-ph:caret-left"
			color="surface"
			variant="ghost"
			onclick={() => {
				const day = dayjs(ledger.date);
				const options: Record<(typeof ledger)['range'], dayjs.Dayjs> = {
					biennial: day.subtract(6, 'month'),
					bimonth: day.subtract(2, 'month'),
					biweek: day.subtract(2, 'week'),
					day: day.subtract(1, 'day'),
					month: day.subtract(1, 'month'),
					quarter: day.subtract(3, 'month'),
					week: day.subtract(1, 'week'),
					year: day.subtract(1, 'year'),
				};
				ledger.date = options[ledger.range].toDate();
			}}
		/>

		<Button label={date_range_label} variant="ghost" color="surface" />

		<Button
			size="xs"
			icon="i-ph:caret-right"
			color="surface"
			variant="ghost"
			onclick={() => {
				const day = dayjs(ledger.date);
				const options: Record<(typeof ledger)['range'], dayjs.Dayjs> = {
					biennial: day.add(6, 'month'),
					bimonth: day.add(2, 'month'),
					biweek: day.add(2, 'week'),
					day: day.add(1, 'day'),
					month: day.add(1, 'month'),
					quarter: day.add(3, 'month'),
					week: day.add(1, 'week'),
					year: day.add(1, 'year'),
				};
				ledger.date = options[ledger.range].toDate();
			}}
		/>
	</div>

	{#if ledger.current}
		<a href="/{ledger.current.id}/settings">
			<img
				class="size-8 rounded-lg"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURI(ledger.current.id)}"
				alt={ledger.current.name}
			/>
		</a>
	{/if}
</nav>

<nav
	class={[
		'fixed p-4 left-0 right-0 z-11',
		'sm:(top-0 pointer-events-none)',
		'<sm:(bottom-0 bg-inverted/75 backdrop-blur-lg border-t border-surface-accented)',
	]}
>
	<div
		class="grid grid-cols-5 grid-rows-1 gap-2 max-w-sm mx-auto pointer-events-auto w-full max-w-sm"
	>
		{#each NAV_LINKS as link, idx (idx)}
			{@const is_link = page.url.pathname === link.href}

			<a
				href={link.href}
				class={[
					'flex flex-col items-center justify-center gap-1 transition relative h-8',
					is_link ? 'text-primary-500' : 'text-muted',
				]}
				title={link.label}
				style:grid-column={idx > 1 ? idx + 2 : idx + 1}
			>
				<Icon
					name={link.icon}
					class={[
						'transition-all absolute',
						link.label === 'Home' ? 'size-5' : 'size-6',
						is_link ? 'mb-4 text-transparent' : '',
					]}
				/>

				<span
					class={[
						'text-xs tracking-wide transition-all top-8 font-medium',
						is_link ? '' : 'text-transparent',
					]}
				>
					{link.label}
				</span>
			</a>
		{/each}

		<span class="col-3 row-1 relative">
			<button
				class="absolute left-1/2 -translate-1/2 size-12 bg-primary text-white rounded-full grid place-items-center top-1/2 hover:bg-primary-400 transition"
				onclick={() => {
					create_transaction.dialog = true;
					create_transaction.date = dayjs();
				}}
			>
				<Icon name="i-ph:plus-bold" class="size-5" />
			</button>
		</span>
	</div>
</nav>
