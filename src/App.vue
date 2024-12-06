<template>
    <h2 class="mb-5 font-weight-light" v-if="stepper_step<3">
        Upload your lease document or invoice, and we’ll analyze it to show you how
        leasing a copier with us could save you up to 20% on your printing costs.
        Take advantage of our tailored solutions to maximize efficiency and reduce expenses.
    </h2>
    <v-stepper v-model="stepper_step" hide-actions color="success" :items="stepper_items">
        <template v-slot:item.1>
            <v-card flat>
                <v-card-text>
                    <v-label class="mb-2">Upload a PDF/Screenshot of your current lease/invoice...</v-label>
                    <v-file-input
                        label="Select a file"
                        color="info"
                        accept=".pdf,.jpeg,.jpg,.png,.bmp"
                        prepend-icon=""
                        prepend-inner-icon="mdi-file"
                        placeholder="Choose a file"
                        :variant="variant"
                        :readonly="is_loading"
                        v-model="file_input">
                        <template #append-inner>
                            Upload <v-icon>mdi-upload</v-icon>
                        </template>
                    </v-file-input>

                    <v-label class="mb-2">Add a brief description of the document (optional)</v-label>
                    <v-textarea :readonly="is_loading" :variant="variant" v-model="description" placeholder="Enter a description here..."/>
                    <v-footer class="pa-0">
                        <h5 v-if="is_loading">
                            <v-progress-circular indeterminate color="primary" size="small"/>
                            <span class="ml-2" v-if="buffer_time>=15">We're still working on it...</span>
                            <span class="ml-2" v-else>Analyzing your file, this might take a minute...</span>
                        </h5>
                        <v-spacer/>
                        <v-btn :loading="is_loading" :disabled="is_loading" @click="UploadFile" color="primary">
                            <v-icon>mdi-upload</v-icon>Upload Document
                        </v-btn>
                    </v-footer>
                </v-card-text>
            </v-card>
        </template>
        <template v-slot:item.2>
            <v-card title='Confirm your details' flat>
                <v-card-text class="mt-5">
                    <v-row>
                        <v-col cols="12" lg="6" md="6" sm="12">
                            <v-text-field :variant="variant" v-model="form.Customer_Company_Name" label="Company name"/>
                        </v-col>
                        <v-col cols="12" lg="6" md="6" sm="12">
                            <v-text-field :variant="variant" v-model="form.Customer_Full_Name" label="Full Name"/>
                        </v-col>
                        <v-col cols="12" lg="6" md="6" sm="12">
                            <v-text-field :variant="variant" v-model="form.Customer_Phone" label="Phone"/>
                        </v-col>
                        <v-col cols="12" lg="6" md="6" sm="12">
                            <v-text-field :variant="variant" v-model="form.Customer_Email" label="Email"/>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field :variant="variant" v-model="form.Customer_Address" label="Business Address"/>
                        </v-col>
                        <v-col cols="12" lg="4" md="4" sm="12">
                            <v-text-field :variant="variant" v-model="form.Customer_City" label="City"/>
                        </v-col>
                        <v-col cols="12" lg="4" md="4" sm="12">
                            <v-text-field :variant="variant" v-model="form.Customer_State" label="State"/>
                        </v-col>
                        <v-col cols="12" lg="4" md="4" sm="12">
                            <v-text-field :variant="variant" v-model="form.Customer_Postal" label="Zip Code"/>
                        </v-col>
                        <v-col cols="12" lg="6" md="6" sm="12">
                            <v-text-field :variant="variant" v-model="form.Customer_Printer" label="Current Printers"/>
                        </v-col>
                        <v-col cols="12" lg="6" md="6" sm="12">
                            <v-combobox
                                :variant="variant"
                                v-model="form.Lease_Term"
                                label="Current Lease Term"
                                :items="['12 Months','24 Months','36 Months','48 Months','60 Months']">
                            </v-combobox>
                        </v-col>
                        <v-col cols="12" lg="4" md="4" sm="12">
                            <v-text-field :variant="variant" v-model="form.Estimated_Black_Prints" label="Monthly Estimated Black Prints"/>
                        </v-col>
                        <v-col cols="12" lg="4" md="4" sm="12">
                            <v-text-field :variant="variant" v-model="form.Estimated_Color_Prints" label="Monthly Estimated Color Prints"/>
                        </v-col>
                        <v-col cols="12" lg="4" md="4" sm="12">
                            <v-text-field :variant="variant" v-model="form.Monthly_Base_Price" label="Current Monthly Payment"/>
                        </v-col>
                    </v-row>
                    <v-footer class="pa-0">
                        <h5 v-if="is_loading">
                            <v-progress-circular indeterminate color="primary" size="small"/>
                            <span class="ml-2">Were processing your request, please wait...</span>
                        </h5>
                        <v-spacer/>
                        <v-btn :loading="is_loading" :disabled="is_loading" @click="Cm8Hook" color="primary">
                            &rarr; Continue
                        </v-btn>
                    </v-footer>
                </v-card-text>
            </v-card>
        </template>
        <template v-slot:item.3>
            <v-card flat>
                <v-card-text>
                    <div class="text-center d-flex align-center mt-5 mb-5">
                        <div style="width:100%">
                            <h2 class="font-weight-light"><v-icon color="success">mdi-check-circle</v-icon> We have received your request!</h2>
                            <h4>We'll get in touch with you as soon as we can.</h4>
                        </div>
                    </div>
                    <v-container class="mb-5 ma-auto">
                        <v-divider/>
                        <v-row class="mt-5">
                            <v-col cols="12" lg="6" md="6" sm="12">
                                <v-text-field variant="plain" label="Company" :model-value="form.Customer_Company_Name" readonly/>
                                <v-text-field variant="plain" label="Your Name" :model-value="form.Customer_Full_Name" readonly/>
                                <v-text-field variant="plain" label="Contact" :model-value="`${form.Customer_Phone} | ${form.Customer_Email}`" readonly/>
                                <v-text-field variant="plain" label="Your Printers" :model-value="form.Customer_Printer" readonly/>
                                <v-text-field variant="plain" label="Estimated Monthly Prints" :model-value="GetTotalEstPrints" readonly/>
                                <v-text-field variant="plain" label="Monthly Payment" :model-value="`${form.Monthly_Base_Price} @ ${ParseNumber(form.Lease_Term)} Months`" readonly/>
                            </v-col>
                            <v-col cols="12" lg="6" md="6" sm="12">
                                <div class="d-flex align-center" style="height:100%">
                                    <div class="text-center">
                                        <h2 class="font-weight-light">Your potential savings</h2>
                                        <div class="total-savings text-success">${{TotalSavings}}</div>
                                        <p>In a {{ParseNumber(this.form.Lease_Term)}} months term, you could save up to ${{TotalSavings}} — a significant step toward your financial goals!</p>
                                        <p class="mt-5">We can replace your old equipment with a new one and lower your bill up to 30%</p>

                                        <div class="ma-auto mt-5">
                                            <v-btn @click="callback.modal=true" variant="outlined" color="red">Request a Callback</v-btn>
                                            <v-btn href="/equipment" variant="outlined" color="red" class="ml-3">See our Catalog</v-btn>
                                        </div>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>

                    <div class="text-center mt-5 mb-5">
                        <a href="/">&larr; Back to homepage</a>
                    </div>
                </v-card-text>
            </v-card>
        </template>
    </v-stepper>
    <Snackbar/>
    <Modal visible
        max_width="600px"
        v-if="callback.modal"
        @onmount="OnModalMount"
        title="Request a Callback"
        @close="callback.modal=false">
        <v-card-text class="mt-3">
            <v-text-field variant="outlined" label="Name" v-model="callback.name"/>
            <v-text-field variant="outlined" label="Phone" v-model="callback.phone"/>
            <v-text-field variant="outlined" disabled label="Email" v-model="form.Customer_Email"/>
            <v-select variant="outlined" label="Timezone" :items="timezones" v-model="callback.timezone"/>
            <v-row>
                <v-col cols="12" lg="6" md="6" sm="12">
                    <v-text-field
                        :active="menu_one"
                        variant="outlined"
                        label="Choose a date"
                        v-model="callback.date"
                        prepend-inner-icon="mdi-calendar">
                        <v-menu
                            v-model="menu_one"
                            activator="parent"
                            transition="scale-transition"
                            :close-on-content-click="false">
                            <v-date-picker v-if="menu_one" v-model="datepicker"/>
                        </v-menu>
                    </v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6" sm="12">
                    <v-select
                        variant="outlined"
                        label="Choose time"
                        v-model="callback.time"
                        :items="time_schedule"
                        prepend-inner-icon="mdi-clock-time-four-outline">
                    </v-select>
                </v-col>
            </v-row>
            <v-card color="#fafafa" v-if="errors.length>0">
                <v-card-text>
                    <ul class="ml-5">
                        <li class="text-red" v-for="error in errors">{{error}}</li>
                    </ul>
                </v-card-text>
            </v-card>
        </v-card-text>
        <template #footer>
            <v-spacer/>
            <v-btn :loading="is_loading" color="info" @click="RequestCallback">Submit</v-btn>
        </template>
    </Modal>
</template>

<script>
import Axios from "axios";
import moment from "moment";
import Server from "@/plugins/Server";
import {mapActions, mapState} from "vuex";
import Modal from "@/components/misc/Modal.vue";
import Snackbar from "@/components/misc/Snackbar.vue";
export default {
    components: {
        Modal,
        Snackbar,
    },
    data: () => ({
        stepper_step: 1,
        stepper_items: [
            'Upload your file',
            'Confirm your details',
            'Your Result'
        ],
        is_loading: false,
        form_valid: false,
        file_input: null,
        description: "",
        buffer_time: 0,
        interval: null,
        variant: 'outlined',
        timezones: ['EST','CST','MST','PST'],
        time_schedule: [
            "9:00 AM", "9:30 AM",
            "10:00 AM", "10:30 AM",
            "11:00 AM", "11:30 AM",
            "12:00 PM", "12:30 PM",
            "1:00 PM", "1:30 PM",
            "2:00 PM", "2:30 PM",
            "3:00 PM", "3:30 PM",
            "4:00 PM", "4:30 PM",
            "5:00 PM"
        ],
        callback: {
            modal: false,
            name: '',
            email: '',
            phone: '',
            timezone: '',
            date: '',
            time: '',
        },
        errors: [],
        menu_one: false,
        datepicker: new Date
    }),
    computed: {
        ...mapState(['form']),
        GetTotalEstPrints() {
            return `Black: ${this.form.Estimated_Black_Prints} | Color: ${this.form.Estimated_Color_Prints}`
        },
        TotalSavings() {
            let monthly = this.ParseNumber(this.form.Monthly_Base_Price);
            let lease_term = this.ParseNumber(this.form.Lease_Term);
            let total_save = (monthly * .20) * lease_term;
            return this.NumberWithCommas(total_save.toFixed(2));
        },
    },
    methods: {
        ...mapActions(['SetSuccess','SetError','SetAnyState']),
        NumberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        UploadFile() {
            if (!this.file_input) return this.SetError('Please choose a file first.');
            this.is_loading = true;
            const headers = {
                'Content-Type': 'multipart/form-data',
                'X-Api-Key': window.reader_config?.reader_api_key,
            };
            const form = new FormData;
            form.append('file_input',this.file_input);
            form.append('description',this.description);
            this.interval = setInterval(()=>this.buffer_time++,1000);
            Server.post('/reader',form, {headers}).then(res => {
                console.log("1800 server: ", res.data);
                clearInterval(this.interval);
                this.is_loading = false;
                this.buffer_time = 0;
                if (res.data.result) {
                    this.SetAnyState({target:'form',value:res.data.response});
                    this.stepper_step = 2;
                } else {
                    this.SetError(res.data.errors);
                }
            });
        },
        Cm8Hook($event,callback_notes = null) {
            if (!this.form.Customer_Full_Name) return this.SetError('Name is required');
            if (!this.form.Customer_Email) return this.SetError('Email is required');
            if (!this.form.Lease_Term) return this.SetError('Lease term is required');
            if (!this.form.Monthly_Base_Price) return this.SetError('Monthly payment is required');
            this.is_loading = true;
            const json_data = {...this.form};
            const total_black = this.ParseNumber(this.form.Estimated_Black_Prints);
            const total_color = this.ParseNumber(this.form.Estimated_Color_Prints);
            json_data.Contact_Form_Notes = callback_notes ?? '';
            json_data.Total_Monthly_Prints = total_black + total_color;
            Axios.post(window.reader_config.connectm8_hook,json_data).then(res => {
                console.log("cm8_res: ", res.data);
                this.stepper_step = 3;
                this.callback.modal = false;
                this.SetSuccess(callback_notes ? "Your request has been submitted.":"Your file has been uploaded!");
                this.is_loading = false;
            });
        },
        ParseNumber(text) {
            return parseFloat(text.replace(/[^0-9.-]+/g, ""));
        },
        OnModalMount() {
            this.callback.phone = this.form.Customer_Phone;
            this.callback.name = this.form.Customer_Full_Name;
        },
        RequestCallback() {
            this.errors = [];
            if (!this.callback.name.trim()) {
                this.errors.push("Name is required.");
            }
            if (!this.callback.phone.trim() || !/^\d{10,15}$/.test(this.callback.phone)) {
                this.errors.push("Enter a valid phone number");
            }
            if (!this.callback.timezone.trim()) {
                this.errors.push("Timezone is required.");
            }
            if (!this.callback.date.trim()) {
                this.errors.push("Date is required.");
            }
            if (!this.callback.time.trim()) {
                this.errors.push("Time is required.");
            }
            if (this.errors.length > 0) return;

            const callback_notes = (`Name: ${this.callback.name}\nPhone: ${this.callback.phone}\nDate/time: ${this.callback.date} ${this.callback.time} ${this.callback.timezone}`);
            this.Cm8Hook(null,callback_notes);
        }
    },
    watch: {
        'datepicker'(newVal) {
            this.callback.date = moment(newVal).format('MM/DD/YYYY');
        }
    }
}
</script>
<style>
.total-savings {
    font-size: 70px;
}
.v-time-picker-controls__ampm__btn__active {
    background: #0a7aff !important;
    color: #fff;
}
.v-toolbar {
    max-height: 60px;
}
</style>

