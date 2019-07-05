let modalStack = [];
let currentModal = null;
// let prevOpenModal = null;
const config = {maxStackCount: 5};

function _search(id) {

    let index = 0;

    const result = modalStack.filter((x, i) => {
        if (x.id === id) {
            index = i;

            return true;
        }
    });

    if (result.length) {
        return [result[0], index];
    }

    return null;
}

function goNextModal() {
    const nextIndex = currentModal.index + 1;
    if (undefined === modalStack[nextIndex]) {
        return false;
    }

    hide();
    _show(modalStack[nextIndex], nextIndex);
}

function goPrevModal() {
    const prevIndex = currentModal.index - 1;
    if (undefined === modalStack[prevIndex]) {
        return false;
    }
    hide();
    _show(modalStack[prevIndex], prevIndex);
}

function showModal(modal) {
    if (typeof modal === 'string') {
        const result = _search(modal);

        if (null === result) {
            return false;
        }
        hide();
        _show(result[0], result[1]);

        return true;
    }

    modalStack.push(modal);
    if (modalStack.length > config.maxStackCount) {
        modalStack.shift();
    }

    if (currentModal && currentModal.shown) {
        _hide(currentModal.modal);
    }
    _show(modal, modalStack.length - 1);
}

function _show(modal, index) {
    modal.show();
    if (typeof modal.onShow === 'function') {
        modal.onShow.apply(modal);
    }
    currentModal = {index, modal, id: modal.id, shown: true};
}

function hide() {
    if (null === currentModal) {
        return false;
    }

    _hide(currentModal.modal);
}

function _hide(modal) {
    currentModal.shown = false;
    modal.hide();
    if (typeof modal.onClose === 'function') {
        modal.onClose.apply(modal);
    }
}

function getModalStack()
{
    return modalStack;
}

function reset()
{
    modalStack = [];
    return modalStack;
}

function getStatus()
{
    return {currentModal}
}

function getConfig()
{
    return config;
}

const ModalManagerTest = {getModalStack, goNextModal, goPrevModal, showModal, hide, reset, getStatus, getConfig};

export {goNextModal, goPrevModal, showModal, hide, ModalManagerTest};