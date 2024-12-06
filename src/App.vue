<template>
    <AppLayout>
        <template #title>Homepage</template>
        <template #sidebar>
            <v-list>
                <v-list-item prepend-icon="mdi-home" href="/">Home</v-list-item>
                <v-list-item prepend-icon="mdi-information-outline" href="/about">About</v-list-item>
            </v-list>
        </template>
        <template #content>
            <router-view/>
        </template>
    </AppLayout>
</template>

<script>
import AppLayout from "@/components/layouts/AppLayout.vue";
export default {
    components: {AppLayout}
}
</script>

