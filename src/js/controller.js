import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config';
import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const hashId = window.location.hash;

    const id = hashId.slice(1);

    if (!id) return;

    // console.log(id);

    recipeView.renderSpinner();

    //update results view to mark selected result
    resultView.update(model.getSearchResultPage());

    //update bookmark view after recipe load
    bookmarkView.update(model.state.bookmarks);

    //1. loading recipe
    await model.loadRecipe(id);

    // console.log(model.state.recipe);

    //2. render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();
    //1. get query search
    const query = searchView.getQuery();
    if (!query) return;

    //2. load search result
    await model.loadSearchResults(query);

    //3. render search data
    resultView.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  resultView.render(model.getSearchResultPage(goToPage));

  paginationView.render(model.state.search);
};

const controlUpdateServings = function (updateTo) {
  model.updateServings(updateTo);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //update recipe view
  recipeView.update(model.state.recipe);

  //render bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //4change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    
    //1render recipe
    recipeView.render(model.state.recipe);
    
    //2success message
    addRecipeView.renderMessage();
    
    //3render bookmark
    bookmarkView.render(model.state.bookmarks);
    

    //toggle modal window
    setTimeout(function () {
      addRecipeView.toggleView();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err);
  }
};

const newFeature = function(){
  console.log("Welcome to the app");
}

const init = function () {
  addRecipeView.addHandlerUpload(controlUploadRecipe);
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  newFeature();
};

init();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
