import View from './view.js';
import icons from 'url:../../img/icons.svg';
import { _ } from 'core-js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler){
      this._parentElement.addEventListener('click', function(e){
          const btn = e.target.closest('.btn--inline');
          if(!btn) return;

          const goToPage = +btn.dataset.goto;
          
          handler(goToPage);
      })
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //1.when in 1st page and other pages are there
    if (curPage === 1 && numPage > 1) {
      return `
       <button data-goto = "${curPage+1}" class="btn--inline pagination__btn--next">
           <span>Page ${curPage + 1}</span>
           <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
            </svg>
       </button>
    `;
    }

    //2.when in other page
    if (curPage < numPage) {
      return `
        <button data-goto = "${curPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage-1}</span>
          </button>

          <button data-goto = "${curPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
    `;
    }

    //3.when in last page
    if (curPage === numPage && numPage > 1) {
      return `
        <button data-goto = "${curPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage-1}</span>
        </button>`;
    }
    //4.when in 1st page and only one page is there
    return '';
  }
}

export default new PaginationView();
