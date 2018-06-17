<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col>
                <h2>Van Hire</h2>
                <p>Below are the details relating to van hire for your registered branches.</p>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="6" md="3">
                <b-card @click.prevent="category('checkout')" class="cursor-pointer">
                    <div class="h1 text-muted text-right mb-4">
                        <i class="fa fa-chevron-circle-right"></i>
                    </div>
                    <div class="h4 mb-0">{{ statistics.initialised + statistics.approved }}</div>
                    <small class="text-muted text-uppercase font-weight-bold">Awaiting Check-out</small>
                    <b-progress height={} class="progress-xs mt-3 mb-0" variant="warning" :value="100"/>
                </b-card>
            </b-col>
            <b-col sm="6" md="3">
                <b-card @click.prevent="category('checkin')" class="cursor-pointer">
                    <div class="h1 text-muted text-right mb-4">
                        <i class="fa fa-chevron-circle-left"></i>
                    </div>
                    <div class="h4 mb-0">{{ statistics.checkout }}</div>
                    <small class="text-muted text-uppercase font-weight-bold">Awaiting Check-in</small>
                    <b-progress height={} class="progress-xs mt-3 mb-0" variant="info" :value="100"/>
                </b-card>
            </b-col>
            <b-col sm="6" md="3">
                <b-card @click.prevent="category('refund')" class="cursor-pointer">
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-calculator"></i>
                    </div>
                    <div class="h4 mb-0">{{ statistics.checkin }}</div>
                    <small class="text-muted text-uppercase font-weight-bold">Awaiting Refund</small>
                    <b-progress height={} class="progress-xs mt-3 mb-0" variant="danger" :value="100"/>
                </b-card>
            </b-col>
            <b-col sm="6" md="3">
                <b-card @click.prevent="category('complete')" class="cursor-pointer">
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-check"></i>
                    </div>
                    <div class="h4 mb-0">{{ statistics.completed }}</div>
                    <small class="text-muted text-uppercase font-weight-bold">Completed</small>
                    <b-progress height={} class="progress-xs mt-3 mb-0" variant="success" :value="100"/>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card header="Vanhire" class="card-accent-warning">
                    <p>
                        Below are listed the van hire bookings that are awaiting check-out.<br>
                        Click on an item to start van check-out procedure.
                    </p>
                    <b-row>
                        <b-col md="4">
                            <b-form-group horizontal label="Results per page">
                                <b-form-select :options="pageOptions" v-model="vanhire.perPage" />
                            </b-form-group>
                        </b-col>
                        <b-col md="4">
                            <b-form-group horizontal label="Filter By">
                                <b-form-select :options="filterOptions" v-model="vanhire.filterState" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-table hover striped
                             :items="find"
                             :fields="vanhire.fields"
                             :filter="vanhire.filterState"
                             :current-page="vanhire.currentPage"
                             :per-page="vanhire.perPage"
                             :sort-by.sync="vanhire.sortBy"
                             :sort-desc.sync="vanhire.sortDesc"
                             @row-clicked="view">
                        <template slot="name" slot-scope="data">
                            {{data.item.v_forename}} {{data.item.v_surname}}
                        </template>
                        <template slot="state" slot-scope="data"><b-badge pill :variant="getStateData(data.item.vanhire_state_id).style">{{ getStateData(data.item.vanhire_state_id).text }}</b-badge></template>
                    </b-table>
                    <nav>
                        <small class="pull-right">{{ vanhire.totalRows }} results in total</small>
                        <b-pagination :total-rows="vanhire.totalRows" :per-page="vanhire.perPage" v-model="vanhire.currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script src="./Dashboard.vue.js"></script>
