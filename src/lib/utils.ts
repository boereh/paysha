import type { Action } from 'svelte/action';
import { on } from 'svelte/events';

export const longpress: Action<
	HTMLElement,
	number | undefined,
	{ onlongpress: (e: CustomEvent) => unknown }
> = (node, threshold = 500) => {
	let timeout: NodeJS.Timeout;

	function start() {
		timeout = setTimeout(() => {
			node.dispatchEvent(new CustomEvent('longpress'));
		}, threshold);
	}

	function cancel() {
		if (timeout) clearTimeout(timeout);
	}

	const moved = on(node, 'pointermove', cancel);
	const uped = on(node, 'pointerup', cancel);
	const downed = on(node, 'pointerdown', start);

	return {
		destroy() {
			moved();
			uped();
			downed();
		},
	};
};
