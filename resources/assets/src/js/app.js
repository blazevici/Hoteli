import Vue from 'vue';

Vue.component('v-application', require('./components/app.vue'))

Vue.component('v-container', require('./components/container.vue'))
Vue.component('v-header', require('./components/header.vue'))
Vue.component('v-footer', require('./components/footer.vue'))

Vue.component('v-card', require('./components/card/card.vue'))
Vue.component('v-card-header', require('./components/card/card-header.vue'))
Vue.component('v-card-footer', require('./components/card/card-footer.vue'))
Vue.component('v-card-body', require('./components/card/card-body.vue'))

Vue.component('v-btn', require('./components/button.vue'))

Vue.prototype.$window = window;

const app = new Vue({
    el: '#app'
});

window.vapp = app;