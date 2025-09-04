<script setup lang="ts">
const name_element = useTemplateRef("name_element");
const session = auth_client.useSession();
const new_name = reactive({ value: "", editing: false });
const same_name = computed(() => {
    if (!session.value.data) return false;
    return new_name.value === session.value.data.user.name;
});

async function updateName() {
    const data = session.value.data;
    if (data === null) return;
    if (!new_name.value || same_name.value) {
        return (new_name.value = "");
    }

    await auth_client.updateUser({
        name: new_name.value,
    });
}
</script>

<template>
    <Signin v-if="session.data === null" />

    <div v-else class="p-4">
        <div class="max-w-7xl mx-auto grid grid-cols-6 gap-4">
            <div
                class="bg-neutral-100 p-4 rounded-xl flex items-center gap-4 col-span-2"
            >
                <img
                    class="w-12 h-12 rounded-lg"
                    :src="
                        session.data.user.image ||
                        `https://api.dicebear.com/9.x/initials/svg?seed=${session.data.user.name}`
                    "
                    alt="user profile picture"
                />

                <div class="flex-grow grid whitespace-nowrap">
                    <span class="text-sm text-neutral-500"> Name</span>
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
            </div>

            <div class="bg-neutral-100 p-4 rounded-xl col-span-4 row-span-2">
                <h1 class="text-xl font-medium pb-4">Account Details</h1>

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

            <div class="bg-neutral-100 p-4 rounded-xl col-span-2">
                <h1 class="text-xl font-medium pb-4">Plan</h1>
            </div>
            <div class="bg-neutral-100 p-4 rounded-xl col-span-3">
                <h1 class="text-xl font-medium pb-4">Billing</h1>
            </div>
            <div class="bg-neutral-100 p-4 rounded-xl col-span-3">
                <h1 class="text-xl font-medium pb-4">Danger Zone</h1>
                <div>
                    <h3>Delete my account</h3>

                    <p>This action is irreversible.</p>
                </div>
            </div>
        </div>
    </div>
</template>
