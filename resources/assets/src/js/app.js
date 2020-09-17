import Vue from 'vue';

window.$ = window.jQuery = require('jquery');
window.Popper = require('popper.js').default;
require('webpack-jquery-ui');
require('webpack-jquery-ui/css');
import 'bootstrap';

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

    let disableddates = $('#startDate').data("disabledDates");

    function unavailable(date) {
        let string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        return [disableddates.indexOf(string) == -1];
    }

    $('#startDate').datepicker({
        dateFormat: 'yy/mm/dd',
        autoclose: true,
        beforeShowDay: unavailable
    })
    .change(dateChanged)
    .on('changeDate', dateChanged);
    
    function dateChanged() {
        $('#endDate').datepicker('destroy');
        $('#endDate').val("");
        $('#endDate').datepicker({
            dateFormat: 'yy/mm/dd',
            minDate: $('#startDate').val(),
            autoclose: true
        });
    }

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

    $(document).on('click', ".banner-gallery img", (e) => {
        let galleryNumber = $(e.target).data("number");
        let bannerImage = $(e.target).parent().prev().find("#banner-" + galleryNumber);

        $(e.target).parent().prev().find(".active").toggleClass("active hidden");
        bannerImage.toggleClass("hidden active");
    });

    $(document).on('keyup', "#comment-area", (e) => {
        if ($(e.target).val() == "") {
            // When deleting all text, this puts counter to 0
            $(e.target).parent().find("#word-counter span").text("0");
        }

        let counter = $(e.target).parent().find("#word-counter span");
        let words = $(e.target).val().match(/\S+/g).length;

        if (words > 500) {
            // Split the string on first 500 words and rejoin on spaces
            let trimmed = $(e.target).val().split(/\s+/, 500).join(" ");
            // Add a space at the end to make sure more typing creates new words
            $(e.target).val(trimmed + " ");
        } else {
            counter.text(words);
        }      
    });

});