<template>
  <div class="animated fadeIn">
      <b-row>
          <b-col>
              <h2>Van Hire <a href="#" @click.prevent="category('dashboard')"><i class="fa fa-cog small"></i></a></h2>

              <p>Below are the statistics and live data for van hire for the branches that you are registered with.</p>
          </b-col>
      </b-row>
      <b-card-group class="mb-4">
          <b-card @click.prevent="category('checkout')" class="cursor-pointer">
              <div class="h1 text-muted text-right mb-4">
                  <i class="icon-arrow-right-circle"></i>
              </div>
              <div class="h4 mb-0">{{ statistics.vanhire.initialised + statistics.vanhire.approved }}</div>
              <small class="text-muted text-uppercase font-weight-bold">Awaiting Check-out</small>
              <b-progress height={} class="progress-xs mt-3 mb-0" variant="warning" :value="100"/>
          </b-card>
          <b-card @click.prevent="category('checkin')" class="cursor-pointer">
              <div class="h1 text-muted text-right mb-4">
                  <i class="icon-arrow-left-circle"></i>
              </div>
              <div class="h4 mb-0">{{ statistics.vanhire.checkout }}</div>
              <small class="text-muted text-uppercase font-weight-bold">Awaiting Check-in</small>
              <b-progress height={} class="progress-xs mt-3 mb-0" variant="info" :value="100"/>
          </b-card>
          <b-card @click.prevent="category('refund')" class="cursor-pointer">
              <div class="h1 text-muted text-right mb-4">
                  <i class="icon-calculator"></i>
              </div>
              <div class="h4 mb-0">{{ statistics.vanhire.checkin }}</div>
              <small class="text-muted text-uppercase font-weight-bold">Awaiting Refund</small>
              <b-progress height={} class="progress-xs mt-3 mb-0" variant="danger" :value="100"/>
          </b-card>
          <b-card @click.prevent="category('complete')" class="cursor-pointer">
              <div class="h1 text-muted text-right mb-4">
                  <i class="icon-check"></i>
              </div>
              <div class="h4 mb-0">{{ statistics.vanhire.completed }}</div>
              <small class="text-muted text-uppercase font-weight-bold">Completed</small>
              <b-progress height={} class="progress-xs mt-3 mb-0" variant="success" :value="100"/>
          </b-card>
      </b-card-group>
      <b-row>
          <b-col>
              <hr>
              <h2>Compliance &amp; Asset Management <a href="#" @click.prevent="compliance('dashboard')"><i class="fa fa-cog small"></i></a></h2>
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
                          <strong>{{ statistics.bookings.pending + statistics.bookings.approved }}</strong>
                          <span>van hires</span>
                      </li>
                      <li>
                          <strong>{{ statistics.bookings.approved }}</strong>
                          <span>approvals</span>
                      </li>
                  </ul>
              </div><!--/social-box-->
          </b-col>
      </b-row><!--/.row-->
      <b-row>
          <b-col>
              <hr>
              <h2>Documentation</h2>
              <p>Below are the documents available for viewing.</p>
          </b-col>
      </b-row>
  </div>
</template>

<script src="./Dashboard.vue.js"></script>
