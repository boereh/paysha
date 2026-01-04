import * as icons from 'phsv/fill';
import type { Component } from 'svelte';
import { icons as phicons, FigmaCategory } from '@phosphor-icons/core';

export const ICONS: Record<string, Component> = icons;
export const ICONS_CATEGORIZED = categorizeIcons();

export function categorizeIcons() {
	const result: Record<FigmaCategory, string[]> = {
		arrows: [],
		brands: [],
		commerce: [],
		communication: [],
		design: [],
		'technology & development': [],
		education: [],
		'math & finance': [],
		games: [],
		'health & wellness': [],
		'maps & travel': [],
		media: [],
		'office & editing': [],
		people: [],
		'security & warnings': [],
		'system & devices': [],
		time: [],
		'weather & nature': [],
	};

	for (const icon of phicons) {
		result[icon.figma_category].push(icon.pascal_name);
	}

	return result;
}
