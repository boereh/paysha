<script setup lang="ts">
definePageMeta({
    layout: "book",
});
</script>

<template>
    <div class="px-4">
        <div
            v-for="index of 5"
            :key="index"
            class="space-y-8 max-w-7xl mx-auto"
        >
            <p>Overview</p>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas a ante a magna efficitur tempor vitae ut purus. Nulla
                facilisi. Aliquam non ex gravida, pharetra metus ultricies,
                tempus massa. Aliquam euismod, magna eu luctus pharetra, diam
                lectus consequat arcu, at dignissim leo felis quis tellus. Donec
                sed convallis sem. Fusce risus elit, accumsan et aliquam
                faucibus, sollicitudin eu velit. Sed condimentum, arcu eget
                feugiat luctus, arcu massa venenatis turpis, quis vulputate urna
                mauris vel nisi. Donec eu nisl non enim luctus efficitur. Nullam
                at erat elit. Cras purus purus, rhoncus non finibus sed, tempor
                et quam. Mauris sit amet neque dapibus, efficitur quam gravida,
                eleifend tortor. Ut porta nunc vel dui consequat condimentum.
                Maecenas porta ligula at pulvinar dapibus. Nullam consectetur
                sapien justo, sed convallis odio ultricies eu.
            </p>

            <p>
                Vestibulum ut blandit arcu. Nulla tempus mauris eu nisi laoreet,
                eu fringilla libero convallis. Curabitur elementum libero ac est
                auctor egestas. Sed at dapibus turpis. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Vivamus eget fermentum felis. Etiam pulvinar mauris
                vel dui fringilla porttitor. Curabitur non sem orci. Morbi
                luctus vel lorem finibus fermentum. Praesent tempor elit in ex
                feugiat pharetra. Praesent viverra eros vel arcu molestie, quis
                suscipit risus auctor. Duis iaculis et risus pulvinar sodales.
                Cras euismod eros sem, at pretium quam tristique eu. Quisque
                tempus sem elit, id facilisis turpis rhoncus a. Ut velit sapien,
                fringilla ut sollicitudin at, sodales ac magna.
            </p>

            <p>
                Etiam at blandit mauris. Aenean eget cursus odio. Pellentesque
                ut pulvinar felis. Pellentesque suscipit mi eu diam dapibus, ac
                imperdiet turpis interdum. Maecenas fermentum dapibus nulla.
                Morbi faucibus nulla nisl. Suspendisse ut efficitur velit.
                Curabitur elementum porta odio a imperdiet.
            </p>

            <p>
                Curabitur lobortis venenatis lacinia. Integer vel leo dapibus,
                molestie lorem a, luctus nisi. Pellentesque non interdum tellus.
                Ut luctus mi eu leo porta interdum. Nulla rhoncus urna eros, a
                porttitor ipsum eleifend in. Vestibulum in pretium dolor. Nunc
                pellentesque augue mauris, vel sagittis ante fringilla a.
            </p>

            <p>
                Aliquam erat volutpat. Duis vitae facilisis eros. Praesent elit
                velit, porta a dapibus non, consectetur ac est. Ut sed ante
                rutrum diam dignissim pretium. In vitae maximus diam, at
                porttitor ipsum. Vivamus ultricies, nunc fringilla imperdiet
                rhoncus, quam elit ullamcorper sapien, et fermentum nibh mi in
                tellus. Maecenas vulputate, ligula nec posuere tristique, velit
                felis tincidunt ligula, nec iaculis ligula lectus sed metus.
                Phasellus pharetra mi porttitor dui luctus vulputate. Fusce
                laoreet laoreet quam eget scelerisque. Nulla quis ligula velit.
                In eget consectetur nulla.
            </p>
        </div>
    </div>
</template>
