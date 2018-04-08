<template>
    <div class="animated fadeIn" v-if="!!loading">
        <b-badge pill variant="warning"><span v-if="!!message" class="mr-1">{{ message }}</span><i class="fa fa-spinner fa-spin"></i></b-badge>
    </div>
</template>

<script src="./Loader.vue.js"></script>