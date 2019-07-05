import {ModalManagerTest} from '@/lib/modal-manager';

describe('Modal manager', () => {

    beforeEach(() => {
        ModalManagerTest.reset();
    });
    beforeEach(() => {

    });


    it('test stack', () => {

    const modal = {
      show() {},
      hide() {},
    };

    const count = 3;

    for(let i=0; i<count; i++) {
        ModalManagerTest.showModal(modal);
    }

    expect(ModalManagerTest.getModalStack().length).toBe(count);
  });

    it('test go back', () => {

        const count = 5;

        for(let i=0; i<count; i++) {
            ModalManagerTest.showModal({
                id: 'modal_' + i,
                show() {},
                hide() {},
            });
        }

        expect(ModalManagerTest.getStatus().currentModal.index).toBe(ModalManagerTest.getModalStack().length - 1);
        expect(ModalManagerTest.getStatus().currentModal.id).toBe('modal_4');

        // Go back
        ModalManagerTest.goPrevModal();
        expect(ModalManagerTest.getStatus().currentModal.index).toBe(ModalManagerTest.getModalStack().length - 2);
        expect(ModalManagerTest.getStatus().currentModal.id).toBe('modal_3');

        // Go back
        ModalManagerTest.goPrevModal();
        expect(ModalManagerTest.getStatus().currentModal.index).toBe(ModalManagerTest.getModalStack().length - 3);
        expect(ModalManagerTest.getStatus().currentModal.id).toBe('modal_2');

        // Go back
        ModalManagerTest.goPrevModal();
        expect(ModalManagerTest.getStatus().currentModal.index).toBe(ModalManagerTest.getModalStack().length - 4);
        expect(ModalManagerTest.getStatus().currentModal.id).toBe('modal_1');

        // Go back
        ModalManagerTest.goPrevModal();
        expect(ModalManagerTest.getStatus().currentModal.index).toBe(ModalManagerTest.getModalStack().length - 5);
        expect(ModalManagerTest.getStatus().currentModal.id).toBe('modal_0');

        // Go back but no further
        ModalManagerTest.goPrevModal();
        expect(ModalManagerTest.getStatus().currentModal.index).toBe(ModalManagerTest.getModalStack().length - 5);
        expect(ModalManagerTest.getStatus().currentModal.id).toBe('modal_0');

        // Go next
        ModalManagerTest.goNextModal();
        expect(ModalManagerTest.getStatus().currentModal.index).toBe(ModalManagerTest.getModalStack().length - 4);
        expect(ModalManagerTest.getStatus().currentModal.id).toBe('modal_1');

        // Go next
        ModalManagerTest.goNextModal();
        expect(ModalManagerTest.getStatus().currentModal.index).toBe(ModalManagerTest.getModalStack().length - 3);
        expect(ModalManagerTest.getStatus().currentModal.id).toBe('modal_2');

        // Go next
        ModalManagerTest.goNextModal();
        expect(ModalManagerTest.getStatus().currentModal.index).toBe(ModalManagerTest.getModalStack().length - 2);
        expect(ModalManagerTest.getStatus().currentModal.id).toBe('modal_3');

        // Go next
        ModalManagerTest.goNextModal();
        expect(ModalManagerTest.getStatus().currentModal.index).toBe(ModalManagerTest.getModalStack().length - 1);
        expect(ModalManagerTest.getStatus().currentModal.id).toBe('modal_4');

        // Go next but stop
        ModalManagerTest.goNextModal();
        expect(ModalManagerTest.getStatus().currentModal.index).toBe(ModalManagerTest.getModalStack().length - 1);
        expect(ModalManagerTest.getStatus().currentModal.id).toBe('modal_4');

        // check if shown
        expect(ModalManagerTest.getStatus().currentModal.shown).toBe(true);
        // hide
        ModalManagerTest.hideAll();
        expect(ModalManagerTest.getStatus().currentModal.shown).toBe(false);
    })
});
