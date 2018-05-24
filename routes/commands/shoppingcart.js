module.exports = function () {
  let message = '';

  var recipeData = helpers.api.searchRecipes('scrambled+eggs', function (recipeData) {
    console.log (recipeData, 'RECIPEDATA');
    message += 'Your search returned ' + recipeData.total + ' responses';
  });

  //for (var i=0; i<recipeData.)
  //helpers.giveOptions()
}
