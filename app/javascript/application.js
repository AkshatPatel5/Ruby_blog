// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import '@hotwired/turbo-rails';
import 'controllers';
import jQuery from 'jquery';
import 'jquery_ujs';
import 'popper';
import 'bootstrap';

// NOTE: make jQuery global if needed
window.$ = window.jQuery = jQuery;
$(function () {
  window.alert('j');
  console.log('j'); // ok
});
window.alert('abc');
import './article';
