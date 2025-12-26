<script setup lang="ts">
const socials = {
    discord: { icon: "simple-icons:discord", label: "Discord" },
    facebook: { icon: "simple-icons:facebook", label: "Facebook" },
    github: { icon: "simple-icons:github", label: "GitHub" },
    gitlab: { icon: "simple-icons:gitlab", label: "Gitlab" },
    google: { icon: "simple-icons:google", label: "Google" },
    linkedin: { icon: "simple-icons:linkedin", label: "LinkedIn" },
    reddit: { icon: "simple-icons:reddit", label: "Reddit" },
    roblox: { icon: "simple-icons:roblox", label: "Roblox" },
    spotify: { icon: "simple-icons:spotify", label: "Spotify" },
    tiktok: { icon: "simple-icons:tiktok", label: "TikTok" },
    twitch: { icon: "simple-icons:twitch", label: "Twitch" },
    twitter: { icon: "simple-icons:x", label: "X (Twitter)" },
};
</script>

<template>
    <div class="p-4 h-[calc(100dvh-9rem)]">
        <div
            class="max-w-7xl mx-auto h-full flex flex-col items-center justify-center gap-4"
        >
            <h1 class="text-3xl font-bold">Sign in to Paysha</h1>

            <p>a nice, open-looking spreadsheet</p>

            <div
                class="max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 py-4"
            >
                <button
                    v-for="({ icon, label }, name) in socials"
                    :key="name"
                    class="flex items-center justify-center h-10 capitalize px-4 gap-2 rounded-md transition bg-neutral-100 border border-neutral-100 hover:(border-neutral-300)"
                    @click="
                        auth_client.signIn.social({
                            provider: name,
                            callbackURL: '/account',
                        })
                    "
                >
                    <Icon :name="icon" />

                    {{ label }}
                </button>
            </div>
        </div>
    </div>
</template>
