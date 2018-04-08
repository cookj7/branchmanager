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
                                description="Enter the customer's full name."
                                label="Enter customer name"
                                label-for="fullName"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="fullName" type="text"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                description="Enter the house name or number for the customer"
                                label="House Name/Number"
                                label-for="address1"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="address1" type="text"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                description="Enter the first line of the address for the customer"
                                label="Address Line 1"
                                label-for="address2"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="address2" type="text"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                description="Enter the second line of the address for the customer"
                                label="Address Line 2"
                                label-for="address3"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="address3" type="text"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                description="Enter the town/city for the customer"
                                label="Town/City"
                                label-for="address4"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="address4" type="text"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                description="Enter the postcode for the customer"
                                label="Postcode"
                                label-for="postcode"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="postcode" type="text"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                description="Driver's date of birth dd/mm/yyyy"
                                label="Date of birth"
                                label-for="dob"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="dob" type="text"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                description="Driver's driving license number"
                                label="Driving license number"
                                label-for="license"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="license" type="text"></b-form-input>
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
                                label-for="driverLicense"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="driverLicense"
                                                :plain="true"
                                                :options="yesNoOptions"
                                                :checked="0">
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group
                                description="Is the customer leaving their vehicle for duration of hire?"
                                label="Leaving vehicle"
                                label-for="leavingVehicle"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="leavingVehicle"
                                                :plain="true"
                                                :options="yesNoOptions"
                                                :checked="0">
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group
                                description="Enter the registration of the vehicle being left at the branch"
                                label="Vehicle registration"
                                label-for="registration"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="registration" type="text"></b-form-input>
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
                                label-for="depositPaid"
                                :label-cols="3"
                                :horizontal="true">
                            <b-input-group>
                                <b-input-group-prepend>
                                    <b-input-group-text><i class="fa fa-gbp"></i></b-input-group-text>
                                </b-input-group-prepend>
                                <b-form-input id="depositPaid" type="text" placeholder="ex. £250.00"></b-form-input>
                                <b-input-group-append><b-input-group-text>.00</b-input-group-text></b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group
                                description="Select the time (to the nearest 30 mins) that the van was collected"
                                label="Collection time"
                                label-for="timeCheckout"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-select id="timeCheckout"
                                           :plain="true"
                                           :options="getTimeOptions()"
                                           value="Please select">
                            </b-form-select>
                        </b-form-group>
                        <b-form-group
                                description="Select the time (to the nearest 30 mins) that the van will be returned"
                                label="Return time"
                                label-for="timeCheckin"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-select id="timeCheckin"
                                           :plain="true"
                                           :options="getTimeOptions()"
                                           value="Please select">
                            </b-form-select>
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
                                label-for="vanReg"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-select id="vanReg"
                                           :plain="true"
                                           :options="vans"
                                           value="Please select">
                            </b-form-select>
                        </b-form-group>
                        <b-form-group
                                description="This should include notes on the condition of the vehicle bodywork"
                                label="Condition of bodywork"
                                label-for="conditionBodywork"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="conditionBodywork" :textarea="true" :rows="9" placeholder="Enter details of any issues"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                description="This should include notes on the windscreen wiper blades"
                                label="Condition of wiper blades"
                                label-for="conditionWiper"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="conditionWiper" :textarea="true" :rows="9" placeholder="Enter details of any issues"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                description="This should include notes on the condition of the windscreen, windows, mirrors, number plate and lights"
                                label="Condition of glass and other surfaces"
                                label-for="conditionWindscreen"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="conditionWindscreen" :textarea="true" :rows="9" placeholder="Enter details of any issues"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                description="This should include notes on the condition of the tyres (including pressure and wear)"
                                label="Condition of tyres"
                                label-for="conditionTyres"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="conditionTyres" :textarea="true" :rows="9" placeholder="Enter details of any issues"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                description="This should include notes on the condition/presence of the spare tyre and jacks"
                                label="Condition of spare wheel/jack"
                                label-for="conditionJack"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="conditionJack" :textarea="true" :rows="9" placeholder="Enter details of any issues"></b-form-input>
                        </b-form-group>
                        <b-form-group
                                description="This should include notes on the functionality of the tail lift"
                                label="Condition of tail lift"
                                label-for="conditionTailLift"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-input id="conditionTailLift" :textarea="true" :rows="9" placeholder="Enter details of any issues"></b-form-input>
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
                                label-for="levelOil"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="levelOil"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group
                                description="Is the coolant at an acceptable level"
                                label="Coolant level"
                                label-for="levelCoolant"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="levelCoolant"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group
                                description="Is the windscreen wash at an acceptable level"
                                label="Windscreen wash level"
                                label-for="levelWindscreenWash"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="levelWindscreenWash"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group
                                description="Is the brake/clutch fluid at an acceptable level"
                                label="Brake/clutch fluid level"
                                label-for="levelBrake"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="levelBrake"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group
                                description="Is the power steering fluid at an acceptable level"
                                label="Power steering fluid level"
                                label-for="levelPowerSteering"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="levelPowerSteering"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group
                                description="Is the condition of the battery at an acceptable level"
                                label="Condition of battery"
                                label-for="levelBattery"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="levelBattery"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group
                                description="Are there any oil or water leaks detected"
                                label="Oil or water leaks"
                                label-for="leaksOilWater"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="leaksOilWater"
                                                :plain="true"
                                                :options="okOptions"
                                                :checked="1">
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group
                                description="Is there a toolkit present in the van?"
                                label="Tool kit"
                                label-for="toolkitPresent"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="toolkitPresent"
                                                :plain="true"
                                                :options="yesNoOptions"
                                                :checked="1">
                            </b-form-radio-group>
                        </b-form-group>
                        <b-form-group
                                description="Is there a Sat nav in the van?"
                                label="Sat Nav"
                                label-for="satNavPresent"
                                :label-cols="3"
                                :horizontal="true">
                            <b-form-radio-group id="satNavPresent"
                                                :plain="true"
                                                :options="yesNoOptions"
                                                :checked="1">
                            </b-form-radio-group>
                        </b-form-group>

                        <div slot="footer">
                            <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Checkout Now</b-button>
                            <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script src="./CheckoutItem.vue.js"></script>
