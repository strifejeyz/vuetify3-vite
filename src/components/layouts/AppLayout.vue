<template>
    <v-app id="layout-app">
        <v-app-bar density="comfortable" :elevation="0" class="border-b">
            <v-app-bar-nav-icon variant="text" @click.stop="drawer=!drawer"/>
            <img style="height:25px" class="ml-2 mr-1 mt-1" src="/vuetify-logo.png" alt="">
            <v-app-bar-title><slot name="title"/></v-app-bar-title>
            <v-spacer/>
            <v-btn flat>Logout</v-btn>
         </v-app-bar>
        <v-navigation-drawer v-model="drawer" location="left">
            <slot name="sidebar"/>
        </v-navigation-drawer>
        <v-main>
            <v-card-text>
                <slot name="content"/>
            </v-card-text>
        </v-main>
        <v-footer v-if="$slots.footer" elevation="1" class="border-t">
            <slot name="footer"/>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: true,
    }),
}
</script>
