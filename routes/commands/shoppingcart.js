module.exports = () => {
  let message = '';
  let recipeData = helpers.api.searchRecipes('scrambled+eggs', function (recipeData) {
    console.log (recipeData, 'RECIPEDATA');
    message += 'Your search returned ' + recipeData.total + ' responses';
  });
}
