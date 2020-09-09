export class Tabs {
    constructor(nodeElement) {
        // get nav
        this.nav = [...nodeElement.children[0].children];

        // get contents
        this.contents = [];
        [...nodeElement.children].forEach((item) => {
            if (item.classList.contains('tabs-content'))
                this.contents.push(item);
        });

        // active
        let active = 0;
        this.getActive = () => active;
        this.setActive = (value) => (active = value);

        // initialize
        this.init();
    }

    init() {
        this.setActiveTab();
        this.handlerOnClick();
    }

    setActiveTab() {
        const nav = this.nav;
        const contents = this.contents;

        const setActiveClass = (element) => {
            element.forEach((item) => item.classList.remove('active'));
            element[this.getActive()].classList.add('active');
        };

        setActiveClass(nav);
        setActiveClass(contents);
    }

    handlerOnClick() {
        const nav = this.nav;

        nav.forEach((item, number) =>
            item.addEventListener('click', () => {
                this.setActive(number);
                this.setActiveTab();
            }),
        );
    }
}
