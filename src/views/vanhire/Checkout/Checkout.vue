<template>
    <div class="animated fadeIn">
        <b-card header="Checkout Pending" class="card-accent-warning">
            <b-table hover striped :items="myProvider" :fields="fields" :current-page="currentPage" :per-page="perPage">
                <template slot="name" slot-scope="data">
                    {{data.item.b_forename}} {{data.item.b_surname}}
                </template>
            </b-table>
            <nav>
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
            </nav>
        </b-card>

        <!--<b-card header="Checkout Completed" class="card-accent-success">-->
            <!--<b-table hover striped :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">-->
                <!--<template slot="status" slot-scope="data">-->
                    <!--<b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>-->
                <!--</template>-->
            <!--</b-table>-->
            <!--<nav>-->
                <!--<b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>-->
            <!--</nav>-->
        <!--</b-card>-->
    </div>
</template>

<script src="./Checkout.vue.js"></script>
