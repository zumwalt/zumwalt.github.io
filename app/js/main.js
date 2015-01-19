jQuery(document).ready(function($){
  'use strict';
  // Day/night
  // --------------------------------------------------
  $('.adjust').on('click', function() {
    console.log('click!');
    $('body').toggleClass('night');
  });
});