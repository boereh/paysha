<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import 'virtual:uno.css';
	import Navigation from '$lib/components/navigation.svelte';
	import { setCurrent, type CurrentContext } from '$lib/context';
	import { page } from '$app/state';
	import { watch } from 'runed';
	import { onMount, tick } from 'svelte';
	import { useBookStore, useLocalStorage } from '$lib/storage';
	import { createExampleBook } from '$lib';

	const { children } = $props();
	const current = $state<CurrentContext>({ book: page.data.book, loading: true });

	watch(
		() => $state.snapshot(current),
		({ book, loading }, prev) => {
			if (loading) return;

			if (book && book.local) {
				const bookstore = useBookStore();
				bookstore.set(book.id, book);
			}

			if (prev?.book && !book) {
				console.log(prev.book, 'what');
			}
		},
		{ lazy: true },
	);

	onMount(async () => {
		if (current.book) return;
		const ls = useLocalStorage();
		const bookstore = useBookStore();
		const current_bookid = await ls.get<string>('current-bookid');
		if (current_bookid) {
			const book = await bookstore.get(current_bookid);

			if (book) {
				current.book = book;
				current.loading = false;
				return;
			}
		}

		current.loading = false;
		await tick();
		current.book = createExampleBook();
		ls.set('current-bookid', current.book.id);
	});

	setCurrent(current);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Paysha</title>
</svelte:head>

<Navigation />

{@render children()}

<style>
	:global(body) {
		@apply: bg-zinc-50 pb-22;
	}
</style>
