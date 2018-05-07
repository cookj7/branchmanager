<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col>
                <loader :loading="loading" message="Loading customer data - please wait"></loader>
            </b-col>
        </b-row>
        <div v-if="!loading">
            <div v-if="request.completed">
                <b-row>
                    <b-col>
                        <b-card class="card-accent-primary">
                            <div slot="header">
                                <i class="fa fa-user"></i> <strong>Checkout Details</strong>
                                <div class="pull-right">
                                    <b-badge  pill variant="primary">Vanhire Checkout: Completed</b-badge>
                                </div>

                            </div>
                            <p>
                                The customer van hire checkout has been successfully completed.
                            </p>

                            <b-table small hover striped :items="summaryItems" :fields="summaryFields"></b-table>

                        </b-card>
                    </b-col>
                </b-row>
            </div>
            <div v-if="!request.completed">
                <b-row>
                    <b-col>
                        <b-card class="card-accent-primary">
                            <div slot="header">
                                <i class="fa fa-user"></i> <strong>Customer Details</strong>
                                <div class="pull-right">
                                    <b-badge  pill variant="primary">Vanhire Checkout: Section 1</b-badge>
                                </div>

                            </div>
                            <p>
                                Once the information has loaded please fill in the check-out form below and click on submit
                                to continue.
                            </p>
                            <b-form-group
                                    label="Booking reference"
                                    label-for="bookingReference"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input plaintext id="bookingReference" type="text" value="123-123"></b-form-input>
                            </b-form-group>
                            <b-form-group
                                    description="Enter the customer's email address."
                                    label="Enter customer email"
                                    label-for="v_email"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input v-model="vanhire.v_email" id="v_email" name="v_email" v-validate="'required|email|max:127'" type="text" :class="{'is-invalid' : errors.has('v_email')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('v_email')">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_email') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Enter the customer's first name."
                                    label="Enter customer first name"
                                    label-for="v_forename"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input v-model="vanhire.v_forename" id="v_forename" name="v_forename" type="text" v-validate="'required|max:25'" :class="{'is-invalid' : errors.has('v_forename')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('v_forename')">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_forename') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Enter the customer's last name."
                                    label="Enter customer last name"
                                    label-for="v_surname"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input v-model="vanhire.v_surname" id="v_surname" name="v_surname" v-validate="'required|max:25'" type="text" :class="{'is-invalid' : errors.has('v_surname')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('v_surname')">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_surname') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Enter the house name or number for the customer"
                                    label="House Name/Number"
                                    label-for="v_address1"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input v-model="vanhire.v_address1" id="v_address1" name="v_address1" v-validate="'required|max:50'" type="text" :class="{'is-invalid' : errors.has('v_address1')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('v_address1')">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_address1') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Enter the first line of the address for the customer"
                                    label="Address Line 1"
                                    label-for="v_address2"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input v-model="vanhire.v_address2" id="v_address2" name="v_address2" v-validate="'required|max:50'" type="text" :class="{'is-invalid' : errors.has('v_address2')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('v_address2')">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_address2') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Enter the second line of the address for the customer"
                                    label="Address Line 2"
                                    label-for="v_address3"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input v-model="vanhire.v_address3" id="v_address3" name="v_address3" v-validate="'max:50'" type="text" :class="{'is-invalid' : errors.has('v_address3')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('v_address3')">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_address3') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Enter the town/city for the customer"
                                    label="Town/City"
                                    label-for="v_address4"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input v-model="vanhire.v_address4" id="v_address4" name="v_address4" v-validate="'required|max:50'" type="text" :class="{'is-invalid' : errors.has('v_address4')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('v_address4')">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_address4') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Enter the postcode for the customer"
                                    label="Postcode"
                                    label-for="v_postcode"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input v-model="vanhire.v_postcode" id="v_postcode" name="v_postcode" v-validate="'required|max:10'" type="text" :class="{'is-invalid' : errors.has('v_postcode')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('v_postcode')">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_postcode') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Enter the primary telephone number for the customer"
                                    label="Telephone (primary)"
                                    label-for="v_telephone1"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input v-model="vanhire.v_telephone1" id="v_telephone1" name="v_telephone1" v-validate="'required|max:20'" type="text" :class="{'is-invalid' : errors.has('v_telephone1')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('v_telephone1')">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_telephone1') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Enter the secondary telephone number for the customer"
                                    label="Telephone (secondary)"
                                    label-for="v_telephone2"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input v-model="vanhire.v_telephone2" id="v_telephone2" name="v_telephone2" v-validate="'max:20'" type="text" :class="{'is-invalid' : errors.has('v_telephone2')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('v_telephone2')">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_telephone2') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Driver's date of birth dd/mm/yyyy"
                                    label="Date of birth"
                                    label-for="v_dob"
                                    :label-cols="3"
                                    :horizontal="true">
                                <date-picker v-model="vanhire.v_dob" type="date" lang="en" :first-day-of-week="1" format="yyyy-MM-dd" confirm :class="{'is-invalid' : errors.has('v_dob')}"></date-picker>
                                <b-form-invalid-feedback :style="{display: errors.has('v_dob') ? 'block' : 'none'}">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_dob') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Driver's driving license number"
                                    label="Driving license number"
                                    label-for="v_license"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input v-model="vanhire.v_license" name="v_license" id="v_license" v-validate="'required|max:50'" type="text" :class="{'is-invalid' : errors.has('v_license')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('v_license')">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_license') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row >
                    <b-col>
                        <b-card class="card-accent-success">
                            <div slot="header">
                                <i class="fa fa-file"></i> <strong>Documentation</strong>
                                <div class="pull-right">
                                    <b-badge  pill variant="success">Vanhire Checkout: Section 2</b-badge>
                                </div>
                            </div>
                            <p>
                                Below is the information relating to the verification of the submitted customer documentation.
                            </p>
                            <b-form-group
                                    description="Please ask the hirer to show their license"
                                    label="Driver's license correct?"
                                    label-for="v_license_confirmed"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="v_license_confirmed"
                                                    v-model="vanhire.v_license_confirmed"
                                                    :plain="true"
                                                    :options="yesNoOptions"
                                                    :checked="0">
                                </b-form-radio-group>
                            </b-form-group>
                            <b-form-group
                                    description="Is the customer leaving their vehicle for duration of hire?"
                                    label="Leaving vehicle"
                                    label-for="v_leaving_vehicle"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="v_leaving_vehicle"
                                                    v-model="vanhire.v_leaving_vehicle"
                                                    :plain="true"
                                                    :options="yesNoOptions"
                                                    :checked="0">
                                </b-form-radio-group>
                            </b-form-group>
                            <b-form-group
                                    description="Enter the registration of the vehicle being left at the branch"
                                    label="Vehicle registration"
                                    label-for="v_customer_reg"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input id="v_customer_reg" name="v_customer_reg" v-model="vanhire.v_customer_reg" type="text" v-validate="(isLeavingCar ? 'required|' : '') + 'max:10'" :class="{'is-invalid' : errors.has('v_customer_reg')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('v_customer_reg')">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_customer_reg') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Has a V5 document been received in the driver's name?"
                                    label="V5 received?"
                                    label-for="documentV5"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="documentV5"
                                                    :plain="true"
                                                    :options="yesNoOptions"
                                                    :checked="0">
                                </b-form-radio-group>
                            </b-form-group>
                            <b-form-group
                                    description="Has a utility document been received in the driver's name?"
                                    label="Utility bill received?"
                                    label-for="documentUtility"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="documentUtility"
                                                    :plain="true"
                                                    :options="yesNoOptions"
                                                    :checked="0">
                                </b-form-radio-group>
                            </b-form-group>
                            <b-form-group
                                    description="What deposit has been received? (e.g. £250/£150)"
                                    label="Deposit Paid"
                                    label-for="v_deposit"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-input-group>
                                    <b-input-group-prepend>
                                        <b-input-group-text><i class="fa fa-gbp"></i></b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input id="v_deposit" name="v_deposit" v-model="vanhire.v_deposit" type="text" placeholder="ex. £250.00" v-validate="'required|min_value:1'" :class="{'is-invalid' : errors.has('v_deposit')}"></b-form-input>
                                    <b-input-group-append><b-input-group-text>.00</b-input-group-text></b-input-group-append>
                                    <b-form-invalid-feedback v-show="errors.has('v_deposit')">
                                        <i class="fa fa-warning"></i> {{ errors.first('v_deposit') }}.
                                    </b-form-invalid-feedback>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group
                                    description="Select the time (to the nearest 30 mins) that the van was collected"
                                    label="Collection time"
                                    label-for="v_start"
                                    :label-cols="3"
                                    :horizontal="true">
                                <date-picker v-model="vanhire.v_start" type="datetime" lang="en" :first-day-of-week="1" format="yyyy-MM-dd hh:mm" confirm :class="{'is-invalid' : errors.has('v_start')}"></date-picker>
                                <b-form-invalid-feedback :style="{display: errors.has('v_start') ? 'block' : 'none'}">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_start') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Select the time (to the nearest 30 mins) that the van will be returned"
                                    label="Return time"
                                    label-for="v_end"
                                    :label-cols="3"
                                    :horizontal="true">
                                <date-picker v-model="vanhire.v_end" type="datetime" lang="en" :first-day-of-week="1" format="yyyy-MM-dd hh:mm" confirm :class="{'is-invalid' : errors.has('v_end')}"></date-picker>
                                <b-form-invalid-feedback :style="{display: errors.has('v_end') ? 'block' : 'none'}">
                                    <i class="fa fa-warning"></i> {{ errors.first('v_end') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row >
                    <b-col>
                        <b-card class="card-accent-warning">
                            <div slot="header">
                                <i class="fa fa-truck"></i> <strong>Van Selection & Condition</strong>
                                <div class="pull-right">
                                    <b-badge  pill variant="warning">Vanhire Checkout: Section 3</b-badge>
                                </div>
                            </div>
                            <b-form-group
                                    description="Select the van that the customer will be hiring."
                                    label="Select Van"
                                    label-for="vanhire_van_id"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-select id="vanhire_van_id"
                                               name="vanhire_van_id"
                                               v-validate="'required'"
                                               v-model="vanhire.vanhire_van_id"
                                               :plain="true"
                                               :options="vans"
                                               value="Please select"
                                               :class="{'is-invalid' : errors.has('vanhire_van_id')}">
                                </b-form-select>
                                <b-form-invalid-feedback v-show="errors.has('vanhire_van_id')">
                                    <i class="fa fa-warning"></i> {{ errors.first('vanhire_van_id') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="This should include notes on the condition of the vehicle bodywork"
                                    label="Condition of bodywork"
                                    label-for="vc_condition_body"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input id="vc_condition_body" v-model="checkout.vc_condition_body" :textarea="true" :rows="9" name="vc_condition_body" placeholder="Enter details of any issues" v-validate="'required|max:512'" :class="{'is-invalid' : errors.has('vc_condition_body')}"></b-form-input>
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
                                <b-form-input id="vc_condition_wipers" v-model="checkout.vc_condition_wipers" :textarea="true" :rows="9" placeholder="Enter details of any issues" name="vc_condition_wipers" v-validate="'required|max:512'" :class="{'is-invalid' : errors.has('vc_condition_wipers')}"></b-form-input>
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
                                <b-form-input id="vc_condition_windscreen" v-model="checkout.vc_condition_windscreen" :textarea="true" :rows="9" placeholder="Enter details of any issues" name="vc_condition_windscreen" v-validate="'required|max:512'" :class="{'is-invalid' : errors.has('vc_condition_windscreen')}"></b-form-input>
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
                                <b-form-input id="vc_condition_tyres" v-model="checkout.vc_condition_tyres" :textarea="true" :rows="9" placeholder="Enter details of any issues" name="vc_condition_tyres" v-validate="'required|max:512'" :class="{'is-invalid' : errors.has('vc_condition_tyres')}"></b-form-input>
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
                                <b-form-input id="vc_condition_sparewheel" v-model="checkout.vc_condition_sparewheel" :textarea="true" :rows="9" placeholder="Enter details of any issues" name="vc_condition_sparewheel" v-validate="'required|max:512'" :class="{'is-invalid' : errors.has('vc_condition_sparewheel')}"></b-form-input>
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
                                <b-form-input id="vc_condition_taillift" v-model="checkout.vc_condition_taillift" :textarea="true" :rows="9" placeholder="Enter details of any issues" name="vc_condition_taillift" v-validate="'required|max:512'" :class="{'is-invalid' : errors.has('vc_condition_taillift')}"></b-form-input>
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
                                    <b-badge pill >Vanhire Checkout: Section 4</b-badge>
                                </div>
                            </div>

                            <b-form-group
                                    description="Is the engine oil at an acceptable level"
                                    label="Engine oil level"
                                    label-for="vc_oil_level"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="levelOil"
                                                    v-model="checkout.vc_oil_level"
                                                    :plain="true"
                                                    :options="okOptions"
                                                    :checked="1">
                                </b-form-radio-group>
                            </b-form-group>
                            <b-form-group
                                    description="Is the coolant at an acceptable level"
                                    label="Coolant level"
                                    label-for="vc_coolant_level"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="vc_coolant_level"
                                                    v-model="checkout.vc_coolant_level"
                                                    :plain="true"
                                                    :options="okOptions"
                                                    :checked="1">
                                </b-form-radio-group>
                            </b-form-group>
                            <b-form-group
                                    description="Is the windscreen wash at an acceptable level"
                                    label="Windscreen wash level"
                                    label-for="vc_screenwash_level"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="vc_screenwash_level"
                                                    v-model="checkout.vc_screenwash_level"
                                                    :plain="true"
                                                    :options="okOptions"
                                                    :checked="1">
                                </b-form-radio-group>
                            </b-form-group>
                            <b-form-group
                                    description="Is the brake/clutch fluid at an acceptable level"
                                    label="Brake/clutch fluid level"
                                    label-for="vc_brake_fluid"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="vc_brake_fluid"
                                                    v-model="checkout.vc_brake_fluid"
                                                    :plain="true"
                                                    :options="okOptions"
                                                    :checked="1">
                                </b-form-radio-group>
                            </b-form-group>
                            <b-form-group
                                    description="Is the power steering fluid at an acceptable level"
                                    label="Power steering fluid level"
                                    label-for="vc_powersteering_fluid"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="vc_powersteering_fluid"
                                                    v-model="checkout.vc_powersteering_fluid"
                                                    :plain="true"
                                                    :options="okOptions"
                                                    :checked="1">
                                </b-form-radio-group>
                            </b-form-group>
                            <b-form-group
                                    description="Is the condition of the battery at an acceptable level"
                                    label="Condition of battery"
                                    label-for="vc_battery_condition"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="vc_battery_condition"
                                                    v-model="checkout.vc_battery_condition"
                                                    :plain="true"
                                                    :options="okOptions"
                                                    :checked="1">
                                </b-form-radio-group>
                            </b-form-group>
                            <b-form-group
                                    description="Are there any oil or water leaks detected"
                                    label="Oil or water leaks"
                                    label-for="vc_oil_water_leaks"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="vc_oil_water_leaks"
                                                    v-model="checkout.vc_oil_water_leaks"
                                                    :plain="true"
                                                    :options="okOptions"
                                                    :checked="1">
                                </b-form-radio-group>
                            </b-form-group>
                            <b-form-group
                                    description="Is there a toolkit present in the van?"
                                    label="Tool kit"
                                    label-for="vc_toolkit"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="vc_toolkit"
                                                    v-model="checkout.vc_toolkit"
                                                    :plain="true"
                                                    :options="yesNoOptions"
                                                    :checked="1">
                                </b-form-radio-group>
                            </b-form-group>
                            <b-form-group
                                    description="Is there a Sat nav in the van?"
                                    label="Sat Nav"
                                    label-for="vc_satnav"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-radio-group id="vc_satnav"
                                                    v-model="checkout.vc_satnav"
                                                    :plain="true"
                                                    :options="yesNoOptions"
                                                    :checked="1">
                                </b-form-radio-group>
                            </b-form-group>

                            <div slot="footer">
                                <b-alert :show="errors.count() > 0" variant="danger">
                                    There are <strong>{{errors.count()}}</strong> errors detected in the form
                                </b-alert>
                                <b-alert :show="request.failed" variant="danger">
                                    The checkout could not be saved for the following reason:
                                    <br><strong>{{ request.message }}</strong>
                                </b-alert>
                                <loader :loading="request.saving" message="Creating checkout ..."></loader>
                                <b-button type="submit" size="sm" variant="primary" @click.prevent="createCheckout()" v-show="!request.saving"><i class="fa fa-dot-circle-o"></i> Checkout Now</b-button>
                                <b-button type="reset" size="sm" variant="danger" @click.prevent="reset()" v-show="!request.saving"><i class="fa fa-ban"></i> Reset</b-button>

                            </div>
                        </b-card>
                    </b-col>
                </b-row>
            </div>

        </div>
    </div>
</template>

<script src="./CheckoutItem.vue.js"></script>
