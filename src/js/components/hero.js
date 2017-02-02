import $ from 'jquery';
import Component from '../lib/component';

const Example = new Component( {
    el: '.hero',
    init() {
        this.bindEvents();
        $(this.el).css('color', 'red');
    },
    bindEvents() {}
} );

export default Example;
