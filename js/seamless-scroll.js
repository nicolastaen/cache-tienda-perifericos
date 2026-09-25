function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}


if(!customElements.get('scroll-seamless')){
    customElements.define('scroll-seamless', class ScrollSeamless extends HTMLElement{
        constructor() {
            super();

            this.listContainer = this.querySelector('.scroll-list');
            this.scrollDirection = this.getAttribute('data-direction') || 'left';
            this.speed =  parseInt(this.getAttribute('data-speed')) || 40;
            this.currentTrans = 0;
            this.lastWindowWidth = window.innerWidth;

            this.observeInView();
            if(window.Shopify?.designMode || window.debug) {
                this.debounceWindowSizeChangeHandler = debounce(this.onWindowSizeChange.bind(this), 500);
                window.addEventListener('resize', this.debounceWindowSizeChangeHandler);
            }
        }

        disconnectedCallback() {
            if(this.debounceWindowSizeChangeHandler) {
                window.removeEventListener('resize', this.debounceWindowSizeChangeHandler);
            }
        }

        init(){
            this.getAllItems();
            if(this.items.length < 1) return;

            this.getOriginalTotalWidth();
            this.cloneItems();
            this.getAllItems();
            this.getGap();

            const transformDistance = this.originalWidth + this.gap;
            if(this.scrollDirection === 'left') {
                this.style.setProperty('--from-x', `0`);
                this.style.setProperty('--end-x', `-${transformDistance}px`);
            }else {
                this.style.setProperty('--from-x', `${ this.clientWidth - this.scrollWidth}px`);
                this.style.setProperty('--end-x', `${this.clientWidth - this.scrollWidth + transformDistance}px`);
            }

            this.style.setProperty('--scroll-speed', `${transformDistance / this.speed}s`);

            this.setAttribute('data-init', 'true');
        }


        onWindowSizeChange() {
            const currentWidth = window.innerWidth;
            if(currentWidth === this.lastWindowWidth) return;
            this.lastWindowWidth = currentWidth;

            if(!this.hasAttribute('data-init')) return;
            this.removeAttribute('data-init');

            setTimeout(()=>{
                this.classList.add('hidden'); 
                this.querySelectorAll('.item-clone').forEach(item=>item.remove());
                this.classList.remove('hidden');

                this.init();
            });
        }

        observeInView() {
            const observer = new IntersectionObserver((entries, observer)=>{
                if(entries[0].isIntersecting) {
                    this.init();
                    observer.disconnect();
                }
            }, {
                "root": null,
                "rootMargin": "100px 0px 100px 0px"
            });

            observer.observe(this);
        }

        cloneItems(){
            const times = Math.ceil(this.clientWidth / this.originalWidth);
            let fragment = document.createDocumentFragment();
            for (let i=0; i < times; i++ ) {
                this.items.forEach(item=>{
                    const cloneItem = item.cloneNode(true);
                    cloneItem.removeAttribute('data-shopify-editor-block');
                    cloneItem.classList.add('item-clone');

                    fragment.appendChild(cloneItem);
                })
            }

            this.listContainer.appendChild(fragment);
        }


        getAllItems() {
            this.items = Array.from(this.querySelectorAll('.scroll-item')); 
        }


        getOriginalTotalWidth() {
            this.originalWidth = this.items[this.items.length - 1].offsetLeft - this.items[0].offsetLeft + this.items[this.items.length - 1].offsetWidth;
        }

        getGap() {
            if (this.items.length < 2) {
                this.gap = 32;
            } else {
                this.gap = this.items[1].offsetLeft - this.items[0].offsetLeft - this.items[0].offsetWidth;
            }
        }

        moveItemVisible(item) {
            if(this.items.indexOf(item) === -1) return;

            const containerRect = this.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();

            let offset;
            if(itemRect.right > containerRect.right) {
                offset = containerRect.right - itemRect.right;
            } else if(itemRect.left < containerRect.left) {
                offset = containerRect.left - itemRect.left;
            } else {
                return;
            }

            this.currentTrans = this.currentTrans + offset;

            this.listContainer.style.transform = `translateX(${this.currentTrans}px)`;
        }
    });
}