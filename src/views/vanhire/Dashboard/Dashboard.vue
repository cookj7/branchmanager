<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col>
                <b-card header="Awaiting Check-out" class="card-accent-warning">
                    <p>
                        Below are listed the van hire bookings that are awaiting check-out.<br>
                        Click on an item to start van check-out procedure.
                    </p>
                    <b-table hover striped
                             :items="findCheckout"
                             :fields="checkout.fields"
                             :current-page="checkout.currentPage"
                             :per-page="checkout.perPage"
                             :sort-by.sync="checkout.sortBy"
                             :sort-desc.sync="checkout.sortDesc"
                             @row-clicked="view">
                        <template slot="name" slot-scope="data">
                            {{data.item.v_forename}} {{data.item.v_surname}}
                        </template>
                    </b-table>
                    <nav>
                        <small class="pull-right">{{ checkout.totalRows }} results in total</small>
                        <b-pagination :total-rows="checkout.totalRows" :per-page="checkout.perPage" v-model="checkout.currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
            <b-col>
                <b-card header="Awaiting Check-in" class="card-accent-primary">
                    <p>
                        Below are listed the van hire bookings that are awaiting check-in.<br>
                        Click on an item to start van check-in procedure.
                    </p>
                    <b-table hover striped
                             :items="findCheckin"
                             :fields="checkin.fields"
                             :current-page="checkin.currentPage"
                             :per-page="checkin.perPage"
                             :sort-by.sync="checkin.sortBy"
                             :sort-desc.sync="checkin.sortDesc"
                             @row-clicked="view">
                        <template slot="name" slot-scope="data">
                            {{data.item.v_forename}} {{data.item.v_surname}}
                        </template>
                    </b-table>
                    <nav>
                        <small class="pull-right">{{ checkin.totalRows }} results in total</small>
                        <b-pagination :total-rows="checkin.totalRows" :per-page="checkin.perPage" v-model="checkin.currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card header="Awaiting Refund" class="card-accent-danger">
                    <p>
                        Below are listed the van hire bookings that are awaiting refund.<br>
                        Click on an item to start van refund procedure.
                    </p>
                    <b-table hover striped
                             :items="findRefund"
                             :fields="refund.fields"
                             :current-page="refund.currentPage"
                             :per-page="refund.perPage"
                             :sort-by.sync="refund.sortBy"
                             :sort-desc.sync="refund.sortDesc"
                             @row-clicked="view">
                        <template slot="name" slot-scope="data">
                            {{data.item.v_forename}} {{data.item.v_surname}}
                        </template>
                    </b-table>
                    <nav>
                        <small class="pull-right">{{ refund.totalRows }} results in total</small>
                        <b-pagination :total-rows="refund.totalRows" :per-page="refund.perPage" v-model="refund.currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
            <b-col>
                <b-card header="Completed" class="card-accent-success">
                    <p>
                        Below are listed the van hire bookings that have been completed.
                    </p>
                    <b-table hover striped
                             :items="findCompleted"
                             :fields="completed.fields"
                             :current-page="completed.currentPage"
                             :per-page="completed.perPage"
                             :sort-by.sync="completed.sortBy"
                             :sort-desc.sync="completed.sortDesc"
                             @row-clicked="view">
                        <template slot="name" slot-scope="data">
                            {{data.item.v_forename}} {{data.item.v_surname}}
                        </template>
                    </b-table>
                    <nav>
                        <small class="pull-right">{{ completed.totalRows }} results in total</small>
                        <b-pagination :total-rows="completed.totalRows" :per-page="completed.perPage" v-model="completed.currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script src="./Dashboard.vue.js"></script>
