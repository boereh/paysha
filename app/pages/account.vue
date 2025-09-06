<script setup lang="ts">
const name_element = useTemplateRef("name_element");
const session = auth_client.useSession();
const new_name = reactive({ value: "", editing: false });
const same_name = computed(() => {
    if (!session.value.data) return false;
    return new_name.value === session.value.data.user.name;
});

async function updateName() {
    if (session.value === null) return;
    if (!new_name.value || same_name.value) return (new_name.value = "");

    await auth_client.updateUser({
        name: new_name.value,
    });
}

// useHead({
//     script: [
//         {
//             src: "https://cdn.jsdelivr.net/npm/@polar-sh/checkout@0.1/dist/embed.global.js",
//             defer: true,
//             "data-auto-init": true,
//         },
//     ],
// });
</script>

<template>
    <template v-if="session.isPending"></template>

    <Signin v-else-if="session.data === null" />

    <div v-else class="p-4 pt-0 <sm:(pb-0 pt-4)">
        <div class="max-w-7xl mx-auto flex flex-col gap-4">
            <h1 class="text-xl text-medium px-4">Account details</h1>

            <div class="bg-whiskey-100 p-4 rounded-xl space-y-4">
                <div class="flex items-center gap-4 col-span-2">
                    <img
                        class="w-12 h-12 rounded-lg"
                        :src="
                            session.data.user.image ||
                            `https://api.dicebear.com/9.x/initials/svg?seed=${session.data.user.name}`
                        "
                        alt="user profile picture"
                    />

                    <div class="flex-grow grid whitespace-nowrap">
                        <span class="text-sm text-whiskey-dark-700/50">
                            Name</span
                        >
                        <span v-if="!new_name.editing">
                            {{ session.data.user.name }}</span
                        >
                        <input
                            v-else
                            v-model="new_name.value"
                            ref="name_element"
                            class="outline-none bg-transparent w-full"
                            type="text"
                            spellcheck="false"
                            autocomplete="off"
                            autofocus
                            :placeholder="session.data.user.name"
                        />
                    </div>

                    <button
                        class="border px-4 h-10 whitespace-nowrap rounded-md border-whiskey-300 hover:bg-whiskey-200 transition flex items-center gap-2"
                        @click="
                            () => {
                                if (new_name.editing) updateName();
                                if (!new_name.editing) name_element?.focus();

                                new_name.editing = !new_name.editing;
                            }
                        "
                    >
                        <Icon name="solar:pen-linear" />

                        {{
                            !new_name.editing
                                ? "Edit"
                                : !new_name.value || same_name
                                  ? "Cancel"
                                  : "Save"
                        }}
                    </button>
                </div>

                <hr class="my-4 border-whiskey-300" />

                <table>
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{{ session.data.user.email }}</td>
                        </tr>
                        <tr>
                            <td>Email Verified</td>
                            <td>
                                {{
                                    session.data.user.emailVerified
                                        ? "Yes"
                                        : "No"
                                }}
                            </td>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>{{ session.data.user.id }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h1 class="text-xl px-4">Plan</h1>

            <div class="bg-whiskey-100 p-4 rounded-xl col-span-2 row-span-2">
                <!--
                <a
                    href="https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_BUZauPo5YvADWuoxieCUxPpMnVXpr5hHyxWpX0aWLzG/redirect"
                    data-polar-checkout
                    data-polar-checkout-theme="dark"
                >
                    Purchase
                </a> -->
            </div>

            <h1 class="text-xl px-4">Danger Zone</h1>

            <div class="bg-whiskey-100 p-4 rounded-xl col-span-3 flex">
                <div class="flex-grow">
                    <h3>Delete my account</h3>

                    <p class="text-sm text-whiskey-dark-700/50">
                        This action is irreversible.
                    </p>
                </div>

                <button></button>
            </div>
        </div>
    </div>
</template>
