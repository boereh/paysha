<script lang="ts">
	import { useCurrent } from '$lib/context';
	import { Dialog, Select, DatePicker } from 'bits-ui';
	import uniqolor from 'uniqolor';
	import { nanoid } from 'nanoid';
	import { ICONS } from '$lib/utils';
	import {
		X,
		ListPlus,
		CreditCard,
		CalendarDots,
		ArrowsClockwise,
		CaretLeft,
		CaretRight,
	} from 'phsv';
	import { today, getLocalTimeZone, DateFormatter } from '@internationalized/date';

	const RECURRING_OPTIONS: Record<string, string> = {};

	type Props = {
		index: number;
	};

	let { index = $bindable(-1) }: Props = $props();
	let amount = $state(0);
	let recurring = $state('');
	let date = $state(today(getLocalTimeZone()));
	const date_formatter = new DateFormatter('en-us', {
		dateStyle: 'medium',
	});
	const current = useCurrent();
</script>

<Dialog.Root
	bind:open={
		() => index >= 0,
		(v) => {
			if (v) return;
			index = -1;
		}
	}
>
	<Dialog.Portal>
		<Dialog.Overlay forceMount>
			{#snippet child({ props, open })}
				<div
					{...props}
					class={['fixed inset-0 transition-all select-none ', open ? 'bg-zinc-50/75' : '']}
					style:pointer-events={open ? 'auto' : 'none'}
					oncontextmenu={(e) => e.preventDefault()}
				></div>
			{/snippet}
		</Dialog.Overlay>
		<Dialog.Content forceMount>
			{#snippet child({ props, open })}
				{@const category = current.book?.categories[index]}
				{@const Icon = category && ICONS[category.icon]}

				<div
					{...props}
					class={[
						'bg-white border-t border-zinc-100 rounded-t-2xl p-4 bottom-0 fixed left-0 right-0 transition-all space-y-4',
						open ? '' : 'translate-y-full',
					]}
					style:pointer-events={open ? 'auto' : 'none'}
					style:padding-bottom="calc(var(--spacing)*4+env(safe-area-inset-bottom))"
				>
					<div class="flex gap-2 items-center">
						<button onclick={() => (index = -1)}><X class="size-4" /></button>

						<span class="flex-1 flex items-center justify-center gap-2">
							{#if Icon}
								<span style:color={uniqolor(category.id, { lightness: [40, 60] }).color}>
									<Icon class="size-5" />
								</span>
							{/if}

							{category?.name}
						</span>

						<button
							class="bg-zinc-800 text-white rounded h-8 text-sm font-medium flex items-center gap-2 px-2"
							onclick={() => {
								if (amount < 1 || !current.book) return;

								current.book.transactions.push({
									category: current.book.categories[index].id,
									amount: amount,
									account: '',
									date: Date.now(),
									id: nanoid(),
									label: '',
									tags: '',
								});
							}}
						>
							<ListPlus class="size-5" />

							Add
						</button>
					</div>

					<input
						bind:value={amount}
						name="transaction-amount"
						autocomplete="off"
						type="number"
						pattern="[0-9]*"
						placeholder="0"
						class="text-2xl text-center min-h-48 w-full placeholder:transition focus:placeholder-transparent"
					/>

					<div class="flex gap-2">
						<button class="flex-1">
							<CreditCard class="size-4" />
							No Account
						</button>
						<button class="flex-1"> <CalendarDots class="size-4" />Today</button>

						<DatePicker.Root open={true} bind:value={date}>
							<DatePicker.Label />
							<DatePicker.Input>
								<DatePicker.Trigger>
									<CalendarDots class="size-4" />

									{date_formatter.format(date.toDate(getLocalTimeZone()))}
								</DatePicker.Trigger>
							</DatePicker.Input>
							<DatePicker.Content>
								<DatePicker.Calendar
									class="bg-white shadow-lg rounded-xl border border-zinc-100 p-4"
								>
									{#snippet children({ months, weekdays })}
										<DatePicker.Header class="flex items-center justify-between">
											<DatePicker.PrevButton
												class="hover:bg-zinc-700 inline-flex size-10 items-center justify-center transition-all active:scale-98"
											>
												<CaretLeft class="size-6" />
											</DatePicker.PrevButton>
											<DatePicker.Heading class="text-[15px] font-medium" />
											<DatePicker.NextButton
												class="hover:bg-zinc-700 inline-flex size-10 items-center justify-center transition-all active:scale-98"
											>
												<CaretRight class="size-6" />
											</DatePicker.NextButton>
										</DatePicker.Header>
										<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
											{#each months as month, midx (midx)}
												<DatePicker.Grid class="w-full border-collapse select-none space-y-1">
													<DatePicker.GridHead>
														<DatePicker.GridRow class="mb-1 flex w-full justify-between">
															{#each weekdays as day, didx (didx)}
																<DatePicker.HeadCell
																	class="text-zinc-500 font-normal w-10 rounded-md text-xs"
																>
																	<div>{day.slice(0, 2)}</div>
																</DatePicker.HeadCell>
															{/each}
														</DatePicker.GridRow>
													</DatePicker.GridHead>
													<DatePicker.GridBody>
														{#each month.weeks as weekDates, wdidx (wdidx)}
															<DatePicker.GridRow class="flex w-full">
																{#each weekDates as date, didx (didx)}
																	<DatePicker.Cell
																		{date}
																		month={month.value}
																		class="p-0! relative text-center text-sm"
																	>
																		<DatePicker.Day
																			class={[
																				'rounded group size-10 whitespace-nowrap border border-transparent p-0 text-sm font-normal',
																				'relative inline-flex items-center justify-center transition-all',
																				'hover:(border-foreground)',
																				'data-[unavailable]:(text-zinc-500 line-through)',
																				'data-[disabled]:(pointer-events-none)',
																				'data-[outside-month]:(pointer-events-none text-zinc-500)',
																				'data-[selected]:(bg-orange-500 font-medium text-white)',
																			]}
																		>
																			<div
																				class="bg-foreground group-data-selected:bg-background group-data-today:block absolute top-[5px] hidden size-1 rounded-full transition-all"
																			></div>
																			{date.day}
																		</DatePicker.Day>
																	</DatePicker.Cell>
																{/each}
															</DatePicker.GridRow>
														{/each}
													</DatePicker.GridBody>
												</DatePicker.Grid>
											{/each}
										</div>
									{/snippet}
								</DatePicker.Calendar>
							</DatePicker.Content>
						</DatePicker.Root>

						<Select.Root type="single" bind:value={recurring}>
							<Select.Trigger
								class="border border-zinc-200 px-4 h-10 rounded flex items-center gap-2"
							>
								<ArrowsClockwise class="size-4" />
								{recurring || 'Once'}
							</Select.Trigger>
							<Select.Portal>
								<Select.Content
									class={['p-2', 'max-h-(--bits-select-content-available-height) select-none']}
								>
									<div
										class="bg-white rounded-lg border border-zinc-200 shadow-lg max-h-full overflow-hidden flex flex-col gap-2"
									>
										<Select.Viewport class="space-y-4 px-2 flex-1 overflow-y-auto">
											{#each Object.entries(RECURRING_OPTIONS) as [label, value] (value)}
												<Select.Item
													{value}
													class="size-8 grid place-items-center bg-zinc-100 rounded"
												>
													{label}
												</Select.Item>
											{/each}
										</Select.Viewport>
									</div>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					</div>
				</div>
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
