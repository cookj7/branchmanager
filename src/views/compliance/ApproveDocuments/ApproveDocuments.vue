<template>
    <div class="animated fadeIn">
        <b-card header="Bookings awaiting document approval">
            <p>Below are the bookings that still require approval of documentation.  To go to the approval stage click on the booking from the table below.</p>
            <b-table hover striped responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
                <template slot="status" slot-scope="data">
                    <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
                </template>
            </b-table>
            <nav>
                <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
            </nav>
        </b-card>
    </div>
</template>

<script src="./ApproveDocuments.vue.js"></script>
