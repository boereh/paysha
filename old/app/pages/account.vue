<script setup lang="ts">
const name_element = useTemplateRef("name_element");
const router = useRouter();
const { data: session } = await auth_client.useSession(useFetch);
const new_name = reactive({ value: "", editing: false });
const same_name = computed(() => {
    if (!session.value) return false;
    return new_name.value === session.value.user.name;
});

async function updateName() {
    if (session.value === null) return;
    if (!new_name.value || same_name.value) return (new_name.value = "");

    await auth_client.updateUser({
        name: new_name.value,
    });
}

if (session.value === null) {
    router.push("/signin");
}

useHead({
    title: "Account | Paysha",
});
</script>

<template>
    <div v-if="session" class="p-4 pt-0 <sm:(pb-0 pt-4)">
        <div class="max-w-7xl mx-auto flex flex-col gap-4">
            <h1 class="text-xl text-medium px-4">Account details</h1>

            <div class="bg-neutral-100 p-4 rounded-xl space-y-4">
                <div class="flex items-center gap-4 col-span-2">
                    <img
                        class="w-12 h-12 rounded-lg"
                        :src="
                            session?.user?.image ||
                            `https://api.dicebear.com/9.x/initials/svg?seed=${session?.user?.name}`
                        "
                        alt="user profile picture"
                    />

                    <div class="flex-grow grid whitespace-nowrap">
                        <span class="text-sm text-neutral-dark-700/50">
                            Name</span
                        >
                        <span v-if="!new_name.editing">
                            {{ session?.user?.name }}</span
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
                            :placeholder="session?.user?.name"
                        />
                    </div>

                    <button
                        class="border px-4 h-10 whitespace-nowrap rounded-md border-neutral-300 hover:bg-neutral-200 transition flex items-center gap-2"
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

                    <button
                        class="border px-4 h-10 whitespace-nowrap rounded-md border-red-300 text-red-400 hover:bg-red-100 transition flex items-center gap-2"
                        @click="
                            auth_client.signOut({
                                fetchOptions: {
                                    onSuccess() {
                                        router.push('/account/signin');
                                    },
                                },
                            })
                        "
                    >
                        <Icon name="solar:logout-2-linear" />

                        Sign out
                    </button>
                </div>

                <hr class="my-4 border-neutral-200" />

                <table>
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{{ session?.user.email }}</td>
                        </tr>
                        <tr>
                            <td>Email Verified</td>
                            <td>
                                {{ session?.user.emailVerified ? "Yes" : "No" }}
                            </td>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>{{ session?.user.id }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h1 class="text-xl px-4">Plan</h1>

            <div class="bg-neutral-100 p-4 rounded-xl col-span-2 row-span-2">
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

            <div class="bg-neutral-100 p-4 rounded-xl col-span-3 flex">
                <div class="flex-grow">
                    <h3>Delete account</h3>

                    <p class="text-sm text-neutral-500">
                        Permanently delete account and all of your data. This
                        action cannot be undone.
                    </p>
                </div>

                <button
                    class="transition border border-red-300 hover:(bg-red-200) text-red-400 px-4 h-10 rounded-md flex items-center gap-2"
                >
                    <Icon name="solar:trash-bin-trash-linear" />
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>
