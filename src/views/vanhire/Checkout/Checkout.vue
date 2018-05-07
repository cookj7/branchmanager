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
                             :items="findPending"
                             :fields="pending.fields"
                             :current-page="pending.currentPage"
                             :per-page="pending.perPage"
                             :sort-by.sync="pending.sortBy"
                             :sort-desc.sync="pending.sortDesc"
                             @row-clicked="view">
                        <template slot="name" slot-scope="data">
                            {{data.item.v_forename}} {{data.item.v_surname}}
                        </template>
                    </b-table>
                    <nav>
                        <small class="pull-right">{{ pending.totalRows }} results in total</small>
                        <b-pagination :total-rows="pending.totalRows" :per-page="pending.perPage" v-model="pending.currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card header="Checked-out" class="card-accent-success">
                    <p>
                        Below are listed the van hire bookings that are currently checked-out.<br>
                        Click on an item to view/edit check-out details.
                    </p>
                    <b-table hover striped
                             :items="findActive"
                             :fields="active.fields"
                             :current-page="active.currentPage"
                             :per-page="active.perPage"
                             :sort-by.sync="active.sortBy"
                             :sort-desc.sync="active.sortDesc"
                             @row-clicked="view">
                        <template slot="name" slot-scope="data">
                            {{data.item.v_forename}} {{data.item.v_surname}}
                        </template>
                    </b-table>
                    <nav>
                        <small class="pull-right">{{ active.totalRows }} results in total</small>
                        <b-pagination :total-rows="active.totalRows" :per-page="active.perPage" v-model="active.currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script src="./Checkout.vue.js"></script>
