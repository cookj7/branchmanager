<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col>
                <h2>Compliance</h2>
                <p>Below are the statistics for compliance and details of available assets.</p>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="3" sm="6">
                <div class="social-box facebook">
                    <i class="fa fa-credit-card"></i>
                    <ul>
                        <li>
                            <strong>tbc</strong>
                            <span>open</span>
                        </li>
                        <li>
                            <strong>tbc</strong>
                            <span>awaiting</span>
                        </li>
                    </ul>
                </div><!--/social-box-->
            </b-col>
            <b-col md="3" sm="6">
                <div class="social-box twitter">
                    <i class="fa fa-file"></i>
                    <ul>
                        <li>
                            <strong>{{ statistics.documents.awaiting }}</strong>
                            <span>awaiting</span>
                        </li>
                        <li>
                            <strong>{{ statistics.documents.approved }} / {{ statistics.documents.rejected }}</strong>
                            <span>pass / fail</span>
                        </li>
                    </ul>
                </div><!--/social-box-->
            </b-col>
            <b-col md="3" sm="6">
                <div class="social-box linkedin">
                    <i class="fa fa-truck"></i>
                    <ul>
                        <li>
                            <strong>{{ statistics.vans.checkedOut }}</strong>
                            <span>checked-out</span>
                        </li>
                        <li>
                            <strong>{{ statistics.vans.checkedIn }}</strong>
                            <span>checked-in</span>
                        </li>
                    </ul>
                </div><!--/social-box-->
            </b-col>
            <b-col md="3" sm="6">
                <div class="social-box google-plus">
                    <i class="fa fa-history"></i>
                    <ul>
                        <li>
                            <strong>{{ statistics.vanhire.pending + statistics.vanhire.approved }}</strong>
                            <span>van hires</span>
                        </li>
                        <li>
                            <strong>{{ statistics.vanhire.approved }}</strong>
                            <span>approvals</span>
                        </li>
                    </ul>
                </div><!--/social-box-->
            </b-col>
        </b-row><!--/.row-->
        <b-row>
            <b-col>
                <b-card header="Document Approval" class="card-accent-warning">
                    <p>
                        Below are listed the van hire bookings that require document approval.<br>
                        Click on an item to start/review document compliance procedure.
                    </p>
                    <b-row>
                        <b-col md="4">
                            <b-form-group horizontal label="Results per page">
                                <b-form-select :options="pageOptions" v-model="compliance.perPage" />
                            </b-form-group>
                        </b-col>
                        <b-col md="4">
                            <b-form-group horizontal label="Filter By">
                                <b-form-select :options="filterOptions" v-model="compliance.filterState" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-table hover striped
                             :items="find"
                             :fields="compliance.fields"
                             :filter="compliance.filterState"
                             :current-page="compliance.currentPage"
                             :per-page="compliance.perPage"
                             :sort-by.sync="compliance.sortBy"
                             :sort-desc.sync="compliance.sortDesc"
                             @row-clicked="view">
                        <template slot="name" slot-scope="data">
                            {{data.item.v_forename}} {{data.item.v_surname}}
                        </template>
                        <template slot="state" slot-scope="data"><b-badge pill :variant="getStateData(data.item.vanhire_state_id).style">{{ getStateData(data.item.vanhire_state_id).text }}</b-badge></template>
                        <template slot="reviewed" slot-scope="data"><b-badge pill variant="success">{{ data.item.approved }}</b-badge> <b-badge pill variant="danger">{{ data.item.rejected }}</b-badge></template>
                        <template slot="pending" slot-scope="data"><b-badge pill variant="warning">{{ data.item.awaiting }}</b-badge></template>
                    </b-table>
                    <nav>
                        <small class="pull-right">{{ compliance.totalRows }} results in total</small>
                        <b-pagination :total-rows="compliance.totalRows" :per-page="compliance.perPage" v-model="compliance.currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script src="./Dashboard.vue.js"></script>
