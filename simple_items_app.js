// store initial state
const initState = {
    items: ['Write App with Redux', 'Fix Car', 'Get Beer'],
    selected: -1
};

const myStore = window.store = createStore(itemsReducer, initState);
myStore.subscribe((state, action) => {
    render(state);
});

render(myStore.getState());

function render(state) {
    // create html string
    let innerHTMLStr = '';
    state.items.forEach((item, index) => {
        innerHTMLStr +=
            `<li>
    <label>
        <input type="radio" value="${index}" name="item" ${state.selected === index ? 'checked' : ''}>
        ${item}
    </label>
</li>
`;
    });

    // add items to DOM
    const listElement = document.querySelector('ul#list');
    listElement.innerHTML = innerHTMLStr;

    // assign change listeners
    const listItems = listElement.querySelectorAll('li');
    Array.prototype.forEach.call(listItems, (listItem) => {
        listItem.addEventListener('change', selectItem);
    });

    // set focus on add input
    const inputElement = document.querySelector('#new-item');
    inputElement.focus();
    selectText(inputElement);
}

// store API
function selectItem(e) {
    myStore.dispatch({
        type: "SELECT_ITEM",
        payload: Number(e.target.value)
    });
};

function addItem() {
    myStore.dispatch({
        type: "ADD_ITEM",
        payload: document.querySelector('#new-item').value
    });
};

function deleteItem(e) {
    myStore.dispatch({
        type: "DELETE_SELECTED_ITEM"
    });
};

// clear all items - use redux!
function clearItems() {
    myStore.dispatch({
        type: "CLEAR_ALL_ITEMS"
    });
}

function inputClick() {
    selectText(event.target);
}

function selectText(element) {
    if (!element.value)
        return;
    element.setSelectionRange(0, element.value.length);
}
