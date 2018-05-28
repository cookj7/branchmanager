<template>
    <div class="animated fadeIn">
        <b-card header="Bookings awaiting document approval">
            <p>Below are the bookings that still require approval of documentation.  To go to the approval stage click on the booking from the table below.</p>
            <b-table hover striped responsive="sm"
                     :items="findApproval"
                     :fields="approval.fields"
                     :current-page="approval.currentPage"
                     :per-page="approval.perPage"
                     :sort-by.sync="approval.sortBy"
                     :sort-desc.sync="approval.sortDesc"
                     @row-clicked="view">
                <template slot="name" slot-scope="data">
                    {{data.item.v_forename}} {{data.item.v_surname}}
                </template>
                <!--<template slot="status" slot-scope="data">-->
                    <!--<b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>-->
                <!--</template>-->
            </b-table>
            <nav>
                <small class="pull-right">{{ approval.totalRows }} results in total</small>
                <b-pagination :total-rows="approval.totalRows" :per-page="approval.perPage" v-model="approval.currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
            </nav>
        </b-card>
    </div>
</template>

<script src="./ApproveDocuments.vue.js"></script>
