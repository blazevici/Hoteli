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

    function next(element, items) {
        if (element.next().length > 0) {
            return element.next();
        } else {
            return items.first();
        }
    }

    function previous(element, items) {
        if (element.prev().length > 0) {
            return element.prev();
        } else {
            return items.last();
        }
    }

    function carouselMove(carousel, nextElement, items) {
        for (let i = 2; i <= items.length; i++) {
            nextElement = next(nextElement, items).css('order', i);
        }

        carousel.removeClass('transition');
        setTimeout (() => {
            carousel.addClass('transition');
        }, 25);
    }

    $(document).on('click', '#showcaseArrow',  () => {
        let carousel = $('.carousel-rooms');
        let rooms = $('.room-item');
        let el = $('.ref-rooms').removeClass('ref-rooms');
        let nextRoom = next(el, rooms);

        nextRoom.addClass('ref-rooms').css('order', 1);
        carouselMove(carousel, nextRoom, rooms);
    });


    $(document).on('click', ".newsArrows", (e) => {
        let carousel = $('.carousel-news');
        let news = $('.news-item');
        let el = $('.ref-news').removeClass('ref-news');
        let nextArticle;

        if ($(e.currentTarget).data('toggle') == 'next') {
            nextArticle = next(el, news);
            carousel.removeClass('transition-reverse');
        } else {
            nextArticle = previous(el, news);
            carousel.addClass('transition-reverse');
        }

        nextArticle.addClass('ref-news').css('order', 1);
        carouselMove(carousel, nextArticle, news);
    });

    $(document).on('click', ".reviewArrows", (e) => {
        let carousel = $('.carousel-reviews');
        let review = $('.review-item');
        let el = $('.ref-review').removeClass('ref-review');
        let nextReview;

        if ($(e.currentTarget).data('toggle') == 'next') {
            nextReview = next(el, review);
            carousel.removeClass('transition-reverse');
        } else {
            nextReview = previous(el, review);
            carousel.addClass('transition-reverse');
        }

        nextReview.addClass('ref-review').css('order', 1);
        carouselMove(carousel, nextReview, review);
    })

});