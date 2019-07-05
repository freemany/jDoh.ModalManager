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
        ModalManagerTest.hide();
        expect(ModalManagerTest.getStatus().currentModal.shown).toBe(false);
    })

    it('test hook', () => {

        let showCount = 0;
        let hideCount = 0;

        ModalManagerTest.showModal({
            id: 'modal_0',
            show: () => {},
            hide: () => {},
            onClose: () => hideCount ++,
            onShow: () => showCount ++,
        });

        expect(showCount).toBe(1);

        ModalManagerTest.hide();

        expect(hideCount).toBe(1);
        expect(showCount).toBe(1);

        ModalManagerTest.showModal({
            id: 'modal_1',
            show() {
            },
            hide() {
            },
        });
        expect(hideCount).toBe(1);
        expect(showCount).toBe(1);

        ModalManagerTest.goPrevModal();
        expect(hideCount).toBe(1);
        expect(showCount).toBe(2);
    })

    it('test max stack', () => {
        const count = ModalManagerTest.getConfig().maxStackCount + 1;

        for(let i=0; i<count; i++) {
            ModalManagerTest.showModal({
                id: 'modal_' + i,
                show() {},
                hide() {},
            });
        }

        expect(ModalManagerTest.getModalStack().length).toBe(ModalManagerTest.getConfig().maxStackCount);
    })
});
