import icons from 'url:../../img/icons.svg';

export default class View{
    _data;

    /**
     * Render received object from DOM
     * @param {Object | Object[]} data the data to be rendered (eg. - recipe)
     * @param {Boolean} (render = true) if false, generate markup instead of rendering dom 
     */
    render(data, render = true){
        if(!data || Array.isArray(data) && data.length === 0) return this.renderError();
        
        this._data = data;
        const markup = this._generateMarkup();

        if(!render) return markup;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data){
        
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));
        // console.log(curElements);

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];

            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() != ''){
                curEl.textContent = newEl.textContent;
            }

            if(!newEl.isEqualNode(curEl)){
                Array.from(newEl.attributes).forEach(attr => {
                    curEl.setAttribute(attr.name, attr.value);
                })
            }
        })
    }

    renderSpinner(){
        const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderError(message = this._errorMessage){
        const markup = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);

    }

    renderMessage(message = this._message){
        const markup = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-smile"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);

    }
}