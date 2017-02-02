import $ from 'jquery';
import Component from '../lib/component';

const NavToggle = new Component( {
    el: '#nav-toggle',
    init() {
        this.bindEvents();

    },

    bindEvents() {
		$(this.el).on('click', this.toggleNav);
	},

	toggleNav() {
		$(this).toggleClass('is-active');
	}
} );

export default NavToggle;
