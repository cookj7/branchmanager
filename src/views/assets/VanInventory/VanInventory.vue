<template>
    <div class="animated fadeIn">
        <b-card header="Bookings awaiting document approval">
            <p>Below are the bookings that still require approval of documentation.  To go to the approval stage click on the booking from the table below.</p>
            <b-table hover striped responsive="sm"
                     :items="vans"
                     :fields="fields"
                     @row-clicked="view">
                <template slot="status" slot-scope="data">
                <b-btn variant="danger">disabled</b-btn>
                </template>
            </b-table>
        </b-card>

    </div>
</template>

<script src="./VanInventory.vue.js"></script>
