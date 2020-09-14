import Vue from 'vue';

window.$ = window.jQuery = require('jquery');

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

$(document).ready( () => {

    function next(element, rooms) {
        if (element.next().length > 0) {
            return element.next();
        } else {
            return rooms.first();
        }
    }

    $(document).on('click', '#showcaseArrow',  () => {
        let carousel = $('.carousel');
        let rooms = $('.room-item');
        let el = $('.ref').removeClass('ref');
        let nextRoom = next(el, rooms);

        nextRoom.addClass('ref').css('order', 1);
        for (let i = 2; i <= rooms.length; i++) {
            nextRoom = next(nextRoom, rooms).css('order', i);
        }

        carousel.removeClass('transition');
        setTimeout (() => {
            carousel.addClass('transition');
        }, 25);
    });

});