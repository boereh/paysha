<script setup lang="ts">
const tabs = [
    { label: "Home", icon: "lucide:home", action() {} },
    { label: "Profile", icon: "lucide:user", action() {} },
    { label: "Settings", icon: "lucide:settings", action() {} },
    { label: "About", icon: "lucide:info", action() {} },
];
const hovering = ref([""]);
const open_new_book = ref(false);
const degrees = ref(0);
const degrees_str = computed(() => degrees.value + "deg");
function test() {
    console.log("wht");
}

// onMounted(() => {
//     setInterval(
//         () => (degrees.value = degrees.value > 360 ? 0 : degrees.value + 1),
//         25,
//     );
// });
</script>

<template>
    <nav
        class="pointer-events-none h-20 flex justify-center p-2 z-10 max-w-screen <sm:(fixed bottom-0) sm:(sticky top-0) gap-4"
    >
        <div
            class="pointer-events-auto bg-white grid grid-cols-4 rounded-md border max-w-full w-sm shadow-md"
        >
            <button
                v-for="tab of tabs"
                :key="tab.label"
                class="flex items-center justify-center"
                @click="
                    () => {
                        open_new_book = false;
                        tab.action();
                    }
                "
                @mouseenter="hovering.push(tab.label)"
                @mouseleave="hovering = hovering.filter((v) => v !== tab.label)"
            >
                <Icon
                    :class="[
                        'transition',
                        hovering.includes(tab.label) && '-translate-y-2',
                    ]"
                    :name="tab.icon"
                    size="24"
                />

                <span
                    :class="[
                        'absolute transition translate-y-4',
                        !hovering.includes(tab.label) && 'opacity-0',
                    ]"
                >
                    {{ tab.label }}
                </span>
            </button>
        </div>

        <button
            class="flex items-center justify-center bg-white shadow-md aspect-square rounded-md border pointer-events-auto z-20"
            @mouseenter="hovering.push('plus')"
            @mouseleave="hovering = hovering.filter((v) => v !== 'plus')"
            @click="open_new_book = !open_new_book"
        >
            <Icon
                :class="[
                    'transition',
                    hovering.includes('plus') && '-translate-y-2',
                ]"
                name="lucide:book-plus"
                size="24"
            />

            <span
                :class="[
                    'absolute transition translate-y-4',
                    !hovering.includes('plus') && 'opacity-0',
                ]"
            >
                Create
            </span>
        </button>
    </nav>

    <div
        :class="[
            'fixed px-2 transition <sm:(bottom-20.5) sm:(top-20.5) z-20 flex justify-center w-full',
            open_new_book
                ? ''
                : 'opacity-0 pointer-events-none <sm:(translate-y-12) sm:(-translate-y-12)',
        ]"
    >
        <div class="w-full bg-white p-4 rounded-md flex-grow max-w-lg">
            <p>Create book</p>
        </div>
    </div>

    <div
        :class="[
            'inset-0 fixed z-15 transition',
            open_new_book ? 'bg-black/50' : 'pointer-events-none',
        ]"
        @click.self="open_new_book = false"
    />
</template>

<style scoped>
.what {
    background-size: 100% 100%;
    background-position: 0px 0px;
    background-image: conic-gradient(
        from v-bind(degrees_str) at 50% 50%,
        #ff0000ff 1%,
        #ff0 16%,
        #0f0 33%,
        #0ff 50%,
        #00f 66%,
        #f0f 82%,
        #ff0000ff 100%
    );
}
</style>
