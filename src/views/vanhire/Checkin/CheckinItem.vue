<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col>
                <loader :loading="loading" message="Loading customer data - please wait"></loader>
            </b-col>
        </b-row>
        <div v-if="!loading">
            <b-row>
                <b-col>
                    <b-card class="card-accent-primary">
                        <div slot="header">
                            <i class="fa fa-user"></i> <strong>Customer Details</strong>
                            <div class="pull-right">
                                <b-badge  pill variant="primary">Vanhire Check-In: Section 1</b-badge>
                            </div>

                        </div>
                        <p>
                            Once the information has loaded please fill in the check-out form below and click on submit
                            to continue.
                        </p>
                    </b-card>
                </b-col>
            </b-row>
            <b-row >
                <b-col>
                    <b-card class="card-accent-success">
                        <div slot="header">
                            <i class="fa fa-file"></i> <strong>Documentation</strong>
                            <div class="pull-right">
                                <b-badge  pill variant="success">Vanhire Check-In: Section 2</b-badge>
                            </div>
                        </div>
                        <p>
                            Below is the information relating to the verification of the submitted customer documentation.
                        </p>
                    </b-card>
                </b-col>
            </b-row>
            <b-row >
                <b-col>
                    <b-card class="card-accent-warning">
                        <div slot="header">
                            <i class="fa fa-truck"></i> <strong>Van Condition</strong>
                            <div class="pull-right">
                                <b-badge  pill variant="warning">Vanhire Check-In: Section 3</b-badge>
                            </div>
                        </div>
                        <b-form-group
                                description="This should include notes on the condition of the vehicle bodywork"
                                label="Condition of bodywork"
                                label-for="vc_condition_body"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="vc_condition_body" v-model="checkin.vc_condition_body" :textarea="true" :rows="9" name="vc_condition_body" placeholder="Enter details of any issues" v-validate="'required|max:512'" :class="{'is-invalid' : errors.has('vc_condition_body')}"></b-form-input>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ checkout.vc_condition_body }}</strong>
                            </b-form-valid-feedback>
                            <b-form-invalid-feedback v-show="errors.has('vc_condition_body')">
                                <i class="fa fa-warning"></i> {{ errors.first('vc_condition_body') }}.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="This should include notes on the windscreen wiper blades"
                                label="Condition of wiper blades"
                                label-for="vc_condition_wipers"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="vc_condition_wipers" v-model="checkin.vc_condition_wipers" :textarea="true" :rows="9" placeholder="Enter details of any issues" name="vc_condition_wipers" v-validate="'required|max:512'" :class="{'is-invalid' : errors.has('vc_condition_wipers')}"></b-form-input>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ checkout.vc_condition_wipers }}</strong>
                            </b-form-valid-feedback>
                            <b-form-invalid-feedback v-show="errors.has('vc_condition_wipers')">
                                <i class="fa fa-warning"></i> {{ errors.first('vc_condition_wipers') }}.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="This should include notes on the condition of the windscreen, windows, mirrors, number plate and lights"
                                label="Condition of glass and other surfaces"
                                label-for="vc_condition_windscreen"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="vc_condition_windscreen" v-model="checkin.vc_condition_windscreen" :textarea="true" :rows="9" placeholder="Enter details of any issues" name="vc_condition_windscreen" v-validate="'required|max:512'" :class="{'is-invalid' : errors.has('vc_condition_windscreen')}"></b-form-input>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ checkout.vc_condition_windscreen }}</strong>
                            </b-form-valid-feedback>
                            <b-form-invalid-feedback v-show="errors.has('vc_condition_windscreen')">
                                <i class="fa fa-warning"></i> {{ errors.first('vc_condition_windscreen') }}.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="This should include notes on the condition of the tyres (including pressure and wear)"
                                label="Condition of tyres"
                                label-for="vc_condition_tyres"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="vc_condition_tyres" v-model="checkin.vc_condition_tyres" :textarea="true" :rows="9" placeholder="Enter details of any issues" name="vc_condition_tyres" v-validate="'required|max:512'" :class="{'is-invalid' : errors.has('vc_condition_tyres')}"></b-form-input>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ checkout.vc_condition_tyres }}</strong>
                            </b-form-valid-feedback>
                            <b-form-invalid-feedback v-show="errors.has('vc_condition_tyres')">
                                <i class="fa fa-warning"></i> {{ errors.first('vc_condition_tyres') }}.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="This should include notes on the condition/presence of the spare tyre and jacks"
                                label="Condition of spare wheel/jack"
                                label-for="vc_condition_sparewheel"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="vc_condition_sparewheel" v-model="checkin.vc_condition_sparewheel" :textarea="true" :rows="9" placeholder="Enter details of any issues" name="vc_condition_sparewheel" v-validate="'required|max:512'" :class="{'is-invalid' : errors.has('vc_condition_sparewheel')}"></b-form-input>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ checkout.vc_condition_sparewheel }}</strong>
                            </b-form-valid-feedback>
                            <b-form-invalid-feedback v-show="errors.has('vc_condition_sparewheel')">
                                <i class="fa fa-warning"></i> {{ errors.first('vc_condition_sparewheel') }}.
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="This should include notes on the functionality of the tail lift"
                                label="Condition of tail lift"
                                label-for="vc_condition_taillift"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="vc_condition_taillift" v-model="checkin.vc_condition_taillift" :textarea="true" :rows="9" placeholder="Enter details of any issues" name="vc_condition_taillift" v-validate="'required|max:512'" :class="{'is-invalid' : errors.has('vc_condition_taillift')}"></b-form-input>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ checkout.vc_condition_taillift }}</strong>
                            </b-form-valid-feedback>
                            <b-form-invalid-feedback v-show="errors.has('vc_condition_taillift')">
                                <i class="fa fa-warning"></i> {{ errors.first('vc_condition_taillift') }}.
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-card>
                </b-col>
            </b-row>
            <b-row >
                <b-col>
                    <b-card class="card-accent-secondary">
                        <div slot="header">
                            <i class="fa fa-tint"></i> <strong>Van Fluid Levels & Items</strong>
                            <div class="pull-right">
                                <b-badge pill >Vanhire Check-In: Section 4</b-badge>
                            </div>
                        </div>

                        <b-form-group
                                description="Is the engine oil at an acceptable level"
                                label="Engine oil level"
                                label-for="vc_oil_level"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="levelOil"
                                                v-model="checkin.vc_oil_level"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ !!checkout.vc_oil_level ? 'OK' : 'NOT OK' }}</strong>
                            </b-form-valid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="Is the coolant at an acceptable level"
                                label="Coolant level"
                                label-for="vc_coolant_level"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="vc_coolant_level"
                                                v-model="checkin.vc_coolant_level"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ !!checkout.vc_coolant_level ? 'OK' : 'NOT OK' }}</strong>
                            </b-form-valid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="Is the windscreen wash at an acceptable level"
                                label="Windscreen wash level"
                                label-for="vc_screenwash_level"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="vc_screenwash_level"
                                                v-model="checkin.vc_screenwash_level"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ !!checkout.vc_screenwash_level ? 'OK' : 'NOT OK' }}</strong>
                            </b-form-valid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="Is the brake/clutch fluid at an acceptable level"
                                label="Brake/clutch fluid level"
                                label-for="vc_brake_fluid"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="vc_brake_fluid"
                                                v-model="checkin.vc_brake_fluid"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ !!checkout.vc_brake_fluid ? 'OK' : 'NOT OK' }}</strong>
                            </b-form-valid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="Is the power steering fluid at an acceptable level"
                                label="Power steering fluid level"
                                label-for="vc_powersteering_fluid"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="vc_powersteering_fluid"
                                                v-model="checkin.vc_powersteering_fluid"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ !!checkout.vc_powersteering_fluid ? 'OK' : 'NOT OK' }}</strong>
                            </b-form-valid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="Is the condition of the battery at an acceptable level"
                                label="Condition of battery"
                                label-for="vc_battery_condition"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="vc_battery_condition"
                                                v-model="checkin.vc_battery_condition"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ !!checkout.vc_battery_condition ? 'OK' : 'NOT OK' }}</strong>
                            </b-form-valid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="Are there any oil or water leaks detected"
                                label="Oil or water leaks"
                                label-for="vc_oil_water_leaks"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="vc_oil_water_leaks"
                                                v-model="checkin.vc_oil_water_leaks"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ !!checkout.vc_oil_water_leaks ? 'OK' : 'NOT OK' }}</strong>
                            </b-form-valid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="Is there a toolkit present in the van?"
                                label="Tool kit"
                                label-for="vc_toolkit"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="vc_toolkit"
                                                v-model="checkin.vc_toolkit"
                                                :plain="true"
                                                :options="yesNoOptions"
                                                :checked="1">
                            </b-form-radio-group>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ !!checkout.vc_toolkit ? 'YES' : 'NO' }}</strong>
                            </b-form-valid-feedback>
                        </b-form-group>
                        <b-form-group
                                description="Is there a Sat nav in the van?"
                                label="Sat Nav"
                                label-for="vc_satnav"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="vc_satnav"
                                                v-model="checkin.vc_satnav"
                                                :plain="true"
                                                :options="yesNoOptions"
                                                :checked="1">
                            </b-form-radio-group>
                            <b-form-valid-feedback :style="{display: 'block'}">
                                <i class="fa fa-info"></i> Checkout value: <strong>{{ !!checkout.vc_satnav ? 'YES' : 'NO' }}</strong>
                            </b-form-valid-feedback>
                        </b-form-group>

                        <div slot="footer">
                            <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Check-In Now</b-button>
                            <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>


<script src="./CheckinItem.vue.js"></script>
