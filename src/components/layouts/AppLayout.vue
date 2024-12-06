<template>
    <v-app id="layout-app">
        <v-app-bar :elevation="0" class="border-b">
            <v-app-bar-nav-icon variant="text" @click.stop="drawer=!drawer"/>
            <v-spacer/>
            <v-spacer/>
            <img style="height:50px" class="hidden-sm hidden-xs mr-5" src="https://1800officesolutions.com/wp-content/uploads/2024/08/1800.png" alt="">
         </v-app-bar>
        <v-navigation-drawer v-model="drawer" location="left">
            <a @click="StartTour" href="#" style="cursor: pointer" class="mt-3 d-block ma-auto text-center">Need some help?</a>

            <v-card-text class="mt-2">
                <v-select @update:model-value="SetSortFilter" label="Sort List" variant="outlined" :items="sort_types"/>
            </v-card-text>
            <v-spacer/>

            <v-divider>Brands</v-divider>
            <v-checkbox-btn :model-value="ItemExists('manufacturers',+make.id)" v-for="(make,index) in manufacturers.filter(man => manufacturers_allowed.includes(man.id))" @update:model-value="SetManufacturers($event,make.id)" class="ml-2" :label="make.name"/>

            <div class="mt-5"></div>

            <v-divider>Type Of Device</v-divider>
            <v-checkbox-btn :model-value="ItemExists('device_types',item.standard_function)" v-for="item in standard_function" @update:model-value="SetAnyFilter($event,'device_types',item.standard_function)" class="ml-2" :label="item.standard_function"/>

            <div class="mt-5"></div>

            <v-divider>Speed (PPM)</v-divider>
            <v-card-text>
                <v-select :model-value="filters.active_speed" @update:model-value="SetActiveSpeed" variant="underlined" :items="[{title:'---',value:null},{title:'Color',value:'color'},{title:'Monochrome',value:'mono'}]"/>
                <v-row>
                    <v-col cols="6">
                        <v-text-field :disabled="!filters.active_speed" @input="SetSpeedMin" :model-value="filters.speed_minimum" type="number" variant="underlined" label="Min" placeholder="min"/>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field :disabled="!filters.active_speed" @input="SetSpeedMax" :model-value="filters.speed_maximum" type="number" variant="underlined" label="Max" placeholder="max"/>
                    </v-col>
                </v-row>
            </v-card-text>

            <div class="mt-5"></div>

            <v-divider>Color/Mono</v-divider>
            <v-checkbox-btn :model-value="ItemExists('copier_colors','Color')" @update:model-value="SetAnyFilter($event,'copier_colors','Color')" class="ml-2" label="Color"/>
            <v-checkbox-btn :model-value="ItemExists('copier_colors','B&W')"   @update:model-value="SetAnyFilter($event,'copier_colors','B&W')" class="ml-2" label="Mono"/>

            <div class="mt-5"></div>

            <v-divider>Paper Size</v-divider>
            <v-checkbox-btn :model-value="ItemExists('paper_sizes','A4')" @update:model-value="SetAnyFilter($event,'paper_sizes','A4')" class="ml-2" label="Legal/Letter/A4"/>
            <v-checkbox-btn :model-value="ItemExists('paper_sizes','A3')" @update:model-value="SetAnyFilter($event,'paper_sizes','A3')" class="ml-2" label="Ledger/Tabloid/A3"/>
        </v-navigation-drawer>
        <v-main>
            <v-card-text style="background:#f1f1f1">
                <slot name="content"/>
            </v-card-text>
        </v-main>
        <v-footer v-if="$slots.footer" style="background:#f1f1f1" elevation="1" class="border-t">
            <slot name="footer"/>
        </v-footer>
    </v-app>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {toRaw} from "vue";
import CopierCart from "@/components/quote-tool/CopierCart.vue";

export default {
    components: {CopierCart},
    data: () => ({
        drawer: true,
        is_logged_in: false,
        profile: null,
        sort_types: [
            {value: 'ascending',  title:'Name (A-Z)'},
            {value: 'descending', title:'Name (Z-A)'},
            {value: 'low to high',title:'Speed (Low to High)'},
            {value: 'high to low',title:'Speed (High to Low)'},
            {value:  null,        title:'---'}
        ]
    }),
    methods: {
        ...mapActions(['SetFilters','SetAnyState']),
        SetManufacturers(is_checked, manufacturer_id) {
            const rawFilters = { ...this.filters };
            const exists = rawFilters.manufacturers.find(m=>m==+manufacturer_id);
            if (is_checked == true) {
                if (!exists) {
                    rawFilters.manufacturers.push(+manufacturer_id);
                }
            }
            else {
                if (exists) {
                    const index = rawFilters.manufacturers.indexOf(+manufacturer_id);
                    if (index !== -1) {
                        rawFilters.manufacturers.splice(index,1);
                    }
                }
            }
            this.SetFilters(rawFilters);
            this.$forceUpdate();
        },
        SetSpeedMin(event) {
            const filters = {...this.filters};
            filters.speed_minimum = +event.target.value;
            if (event.target.value.length < 1) filters.speed_minimum = null;
            this.SetFilters(filters);
        },
        SetSpeedMax(event) {
            const filters = {...this.filters};
            filters.speed_maximum = +event.target.value;
            if (event.target.value.length < 1) filters.speed_maximum = null;
            this.SetFilters(filters);
        },
        SetAnyFilter(is_checked, target, value) {
            const rawFilters = { ...this.filters };
            const exists = rawFilters[target].find(c=>c==value);
            if (is_checked == true) {
                if (!exists) {
                    rawFilters[target].push(value);
                }
            }
            else {
                if (exists) {
                    const index = rawFilters[target].indexOf(value);
                    if (index !== -1) {
                        rawFilters[target].splice(index,1);
                    }
                }
            }
            this.SetFilters(rawFilters);
            this.$forceUpdate();
        },
        SetSortFilter(value) {
            const rawFilters = { ...this.filters };
            rawFilters.sort_type = value;
            this.SetFilters(rawFilters);
        },
        SetActiveSpeed(value) {
            const rawFilters = { ...this.filters };
            rawFilters.active_speed = value;
            this.SetFilters(rawFilters);
        },
        ItemExists(target,value) {
            return this.filters[target].includes(value);
        },
        StartTour() {
            this.SetAnyState({
                target: 'tour_enabled',
                value: true
            });
            this.tour_instance.start();
            this.tour_instance.show('shepherd-step-one');
        }
    },
    mounted() {
        // Set defaults for drawers on small screens
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            this.drawer = false;
            this.SetAnyState({
                target: 'config_drawer',
                value: false,
            });
        }
    },
    computed: {
        ...mapState([
            'products',
            'filters',
            'manufacturers',
            'standard_function',
            'manufacturers_allowed',
            'catalog_page_title',
            'tour_instance'
        ])
    }
}
</script>
<style>
#layout-app .v-application__wrap {
    height: fit-content !important;
    margin-bottom: 50px;
    border-bottom: 1px solid #d1d1d1;
    min-height: 120vh
}
</style>
