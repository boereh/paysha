<script setup lang="ts">
const socials = {
    discord: "simple-icons:discord",
    facebook: "simple-icons:facebook",
    github: "simple-icons:github",
    google: "simple-icons:google",
    linkedin: "simple-icons:linkedin",
    paypal: "simple-icons:paypal",
    reddit: "simple-icons:reddit",
    roblox: "simple-icons:roblox",
    spotify: "simple-icons:spotify",
    tiktok: "simple-icons:tiktok",
    twitch: "simple-icons:twitch",
    x: "simple-icons:x",
};
</script>

<template>
    <div class="p-4 h-[calc(100dvh-4.5rem)]">
        <div
            class="max-w-7xl mx-auto h-full flex flex-col items-center justify-center gap-4"
        >
            <h1 class="text-3xl font-bold">Sign in to Paysha</h1>

            <p>a nice, open-looking spreadsheet</p>

            <div
                class="max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 py-4"
            >
                <button
                    v-for="(icon, name) in socials"
                    :key="name"
                    class="flex items-center justify-center h-10 capitalize px-4 gap-2 rounded-md transition bg-neutral-100 hover:bg-neutral-200"
                    @click="
                        auth_client.signIn.social({
                            provider: name,
                            callbackURL: '/account',
                        })
                    "
                >
                    <Icon :name="icon" />

                    {{ name }}
                </button>
            </div>
        </div>
    </div>
</template>
