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
                                <i class="fa fa-credit-card"></i> <strong>Refund Details</strong>
                                <div class="pull-right">
                                    <b-badge  pill variant="success"><i class="fa fa-check"></i> Vanhire Refund: Completed</b-badge>
                                </div>

                            </div>
                            <p>
                                The customer van hire refund has been successfully processed.
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
                                <i class="fa fa-credit-card"></i> <strong>Refund Details</strong>
                                <div class="pull-right">
                                    <b-badge  pill variant="primary">Vanhire Refund Details</b-badge>
                                </div>

                            </div>
                            <p>
                                Once the information has loaded please fill in the refund form below and click on "refund now" button
                                to continue.
                            </p>
                            <b-form-group
                                    label="Booking reference"
                                    label-for="booking_reference"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input plaintext id="booking_reference" type="text" :value="bookingReference"></b-form-input>
                            </b-form-group>
                            <b-form-group
                                    label="Customer Name"
                                    label-for="customer_name"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input plaintext id="customer_name" type="text" :value="customerName"></b-form-input>
                            </b-form-group>
                            <b-form-group
                                    label="Telephone"
                                    label-for="telephone_number"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input plaintext id="telephone_number" type="text" :value="telephoneNumber"></b-form-input>
                            </b-form-group>
                            <b-form-group
                                    label="Original Deposit"
                                    label-for="amount_paid"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input plaintext id="amount_paid" type="text" :value="amountPaid"></b-form-input>
                            </b-form-group>
                            <b-form-group
                                    label="Date Due"
                                    label-for="date_due"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input plaintext id="date_due" type="text" :value="dateDue"></b-form-input>
                            </b-form-group>
                            <b-form-group
                                    description="How much is being refuded? (e.g. £250/£150)"
                                    label="Refund Amount"
                                    label-for="vr_amount"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-input-group>
                                    <b-input-group-prepend>
                                        <b-input-group-text><i class="fa fa-gbp"></i></b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input id="vr_amount" name="vr_amount" v-model="refund.vr_amount" type="text" placeholder="ex. £250.00" v-validate="'required|min_value:1'" :class="{'is-invalid' : errors.has('vr_amount')}"></b-form-input>
                                    <b-input-group-append><b-input-group-text>.00</b-input-group-text></b-input-group-append>
                                    <b-form-invalid-feedback v-show="errors.has('vr_amount')">
                                        <i class="fa fa-warning"></i> {{ errors.first('vr_amount') }}.
                                    </b-form-invalid-feedback>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group
                                    description="Enter the last 4 digits of the customer's card."
                                    label="Last 4 Digits Of Card Number"
                                    label-for="vr_card_last"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-input v-model="refund.vr_card_last" id="vr_card_last" name="vr_card_last" type="text" v-validate="'required|max:4|min:4'" :class="{'is-invalid' : errors.has('vr_card_last')}"></b-form-input>
                                <b-form-invalid-feedback v-show="errors.has('vr_card_last')">
                                    <i class="fa fa-warning"></i> {{ errors.first('vr_card_last') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                                    description="Notes on the customer refund (optional)."
                                    label="Notes"
                                    label-for="vr_notes"
                                    :label-cols="3"
                                    :horizontal="true">
                                <b-form-textarea id="vr_notes"
                                                 name="vr_notes"
                                                 v-model="refund.vr_notes"
                                                 v-validate="'max:600'"
                                                 :class="{'is-invalid' : errors.has('vr_notes')}"
                                                 :rows="3"
                                                 :max-rows="6">
                                </b-form-textarea>
                                <b-form-invalid-feedback v-show="errors.has('vr_notes')">
                                    <i class="fa fa-warning"></i> {{ errors.first('vr_notes') }}.
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <div slot="footer">
                                <loader :loading="request.saving" message="Creating refund ..."></loader>
                                <b-button type="submit" size="sm" variant="primary" @click.prevent="createRefund()" v-show="!request.saving"><i class="fa fa-dot-circle-o"></i> Refund Now</b-button>
                                <b-button type="reset" size="sm" variant="danger" @click.prevent="reset()" v-show="!request.saving"><i class="fa fa-ban"></i> Reset</b-button>

                            </div>
                        </b-card>
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>
</template>

<script src="./RefundItem.vue.js"></script>
