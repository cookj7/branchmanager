<template>
    <div class="animated fadeIn">
        <b-row v-if="loading">
            <b-col>
                <loader :loading="loading" message="Loading customer document data - please wait"></loader>
            </b-col>
        </b-row>
        <div v-if="!loading">
            <b-row>
                <b-col>
                    <b-card class="card-accent-primary">
                        <div slot="header">
                            <i class="fa fa-user"></i> <strong> Customer Booking Details</strong>
                            <div class="pull-right">
                                <b-badge  pill variant="primary">Vanhire Booking Details</b-badge>
                            </div>

                        </div>
                        <p>
                            Below are the details of the van hire to use as a basis for approval of the uploaded documents.
                        </p>

                        <b-table small striped :items="summaryItems" :fields="summaryFields"></b-table>

                    </b-card>
                </b-col>
            </b-row>
            <b-row>
                <b-col v-for="document in documents" :key="document.id" sm="6" md="4">
                    <b-card>
                        <div slot="header">
                            <i class="fa" :class="[isDocument(document) ? 'fa-file-o' : 'fa-info-circle']"></i> {{ isDocument(document) ? 'File' : 'Item' }}: {{ document.category.name }}
                            <b-badge v-if="isDocumentPending(document)" pill variant="warning" class="float-right"><i class="fa fa-clock-o"></i> awaiting approval</b-badge>
                            <b-badge v-if="isDocumentAccepted(document)" pill variant="success" class="float-right"><i class="fa fa-check-circle"></i> approved</b-badge>
                            <b-badge v-if="isDocumentRejected(document)" pill variant="danger" class="float-right"><i class="fa fa-times-circle"></i> rejected</b-badge>
                        </div>
                        <dl class="row">
                            <dt class="col-sm-3">Type</dt>
                            <dd class="col-sm-9">{{ document.category.name }}</dd>

                            <dt v-if="isDocument(document)" class="col-sm-3">File</dt>
                            <dd v-if="isDocument(document)" class="col-sm-9">
                                <a :href="getViewUrl(document)" target="_tab" class="mr-2"><i class="fa fa-cloud"></i> open</a>
                                <a :href="getDownloadUrl(document)"><i class="fa fa-cloud-download"></i> download</a>
                            </dd>

                            <dt v-if="!isDocument(document)" class="col-sm-3">Data</dt>
                            <dd v-if="!isDocument(document)" class="col-sm-9">
                                {{ document.reference }}
                            </dd>
                        </dl>
                        <div v-if="isDocument(document)">
                            Download and review the document to determine is approval is granted for this item.
                        </div>
                        <div v-if="!isDocument(document)">
                            Review the supplied data to determine whether approval is granted for this item.
                        </div>
                        <b-row class="mt-2">
                            <b-col>
                                <b-form-select id="vanhire_document_rejection_reason_id"
                                               name="vanhire_document_rejection_reason_id"
                                               v-model="document.rejectionId"
                                               :plain="true"
                                               :options="reasons"
                                               value="Please select"
                                               :class="{'is-invalid' : !!document.invalid }"
                                               :disabled="!isDocumentPending(document)"
                                        >
                                    <option :value="null">Please select a rejection reason</option>
                                </b-form-select>
                                <b-form-invalid-feedback v-show="!!document.invalid">
                                    <i class="fa fa-warning"></i> You muse select a rejection reason.
                                </b-form-invalid-feedback>
                            </b-col>
                        </b-row>

                        <div slot="footer">
                            <!--<b-alert :show="request.failed" variant="danger">-->
                                <!--The checkout could not be saved for the following reason:-->
                                <!--<br><strong>{{ request.message }}</strong>-->
                            <!--</b-alert>-->
                            <b-button v-if="isDocumentPending(document)" type="submit" size="sm" variant="success"  @click.prevent="setStatus(document, 'approve')" :disabled="!!document.saving"><i class="fa fa-check-circle"></i> Approve</b-button>
                            <b-button v-if="isDocumentPending(document)" type="submit" size="sm" variant="danger"  @click.prevent="setStatus(document, 'reject')" :disabled="!!document.saving"><i class="fa fa-times-circle"></i> Reject</b-button>
                            <b-button v-if="isDocumentAccepted(document) || isDocumentRejected(document)" type="submit" size="sm" variant="primary" @click.prevent="setStatus(document, 'revert')" :disabled="!!document.saving"><i class="fa fa-undo"></i> Undo {{ isDocumentAccepted(document) ? 'Approval' : 'Rejection' }}</b-button>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </div>

    </div>
</template>

<script src="./ApproveDocumentItem.vue.js"></script>
