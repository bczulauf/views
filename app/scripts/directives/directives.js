'use strict';

var directives = angular.module('appmaker.directives', []);

//Color Picker element
directives.directive("colorpicker", function () {
	return {
		restrict: "E",
		link: function () {
			$('.color-option').click(function () {
				var background = $(this).attr('color');
				$('.current-page').attr('class','current-page '+background+'');
			})
		},
		template: "<div class='page-color-component'><div class='page-color clearfix'><div class='color-option white' color='white'></div><div class='color-option clouds' color='clouds'></div><div class='color-option concrete' color='concrete'></div><div class='color-option wet-asphalt' color='wet-asphalt'></div><div class='color-option peter-river' color='peter-river'></div><div class='color-option sun-flower' color='sun-flower'></div><div class='color-option carrot' color='carrot'></div><div class='color-option alizarin' color='alizarin'></div><div class='color-option turquoise' color='turquoise'></div></div></div>"
	}
});

//Compile content
directives.directive( 'showData', function ( $compile ) {
  return {
    scope: true,
    link: function ( scope, element, attrs ) {
      var el;

      attrs.$observe( 'template', function ( tpl ) {
        if ( angular.isDefined( tpl ) ) {
          // compile the provided template against the current scope
          el = $compile( tpl )( scope );

          // stupid way of emptying the element
          element.html("");

          // add the template content
          element.append( el );
        }
      });
    }
  };
});