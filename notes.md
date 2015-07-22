Github: https://github.com/sequentialscott/Wireframe-CSS

work around for scrolling
<a href="" data-ng-click="scrollTo(style.id)">{{ style.title }}</a>
<a id="{{ style id }}"></a>


ng-include - takes an html file and drops it in place through an ajax call.
<div class="" data-ng-include="style.id + '.html'">

Look up how ng-class works to add a class to a div
Look up how data-ng-show works //angular directive that shows an element if it evaluations to true
ng- are reserved for Angular directives


hilite me to display markup as markup


with angular you can make up your own elements and attributes
directive is a little template that you're going to reuse and drop in the place of the html element

the convention ist hat wfLoading will become wf-loading in html



angular.module('wfDirectives').directives('wfLoading', function(){
  return {
    restrict: 'AE', //restricting this to Attributes and elements
    replace: true, //this will take out the <wf-loading></wf-loading> and replace it with the return of the directives
    template: '<div class="spinner"><div class="rect1"></div>
  }
})

angular.module('wfDirectives').directive('wfCollapse', function(){
  return {
    restrict: 'AE',
    transclude: true, //?
    replace:true,
    scope: {
      headingLevel: '=',
      hideIndicator: '='
    },
    template: '...' +
      '<div data-ng-show="expanded">' +
        '<div data-ng-transclude'></div> + //replaces the innerHTML(?) of the targeted element
      '</div>'
    link: function(scope, element, attrs){
      //works like a mini controller inside your directive
      scope.headingText = attrs.headingText;
      scope.explanded = !('closed' in attrs);
      scope.toggle = function(){
        scope.expanded = !scope.expanded;
      }

    }
  }

})
