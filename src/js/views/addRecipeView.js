import icons from 'url:../../img/icons.svg';
import View from './view';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe uploaded successfully!';

  constructor(){
      super();
      this._addHandlerShowModal();
      this._addHandlerHideModal();
  }

  toggleView(){
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowModal(){
    this._btnOpen.addEventListener('click', this.toggleView.bind(this));
  }

  _addHandlerHideModal(){
    this._btnClose.addEventListener('click', this.toggleView.bind(this));
    this._overlay.addEventListener('click', this.toggleView.bind(this));
  }

  addHandlerUpload(handler){
      this._parentElement.addEventListener('submit', function(e){
          e.preventDefault();
          const dataArray = [...new FormData(this)];
          const data = Object.fromEntries(dataArray);
          handler(data);
          
      })
  }
}
export default new AddRecipeView();
