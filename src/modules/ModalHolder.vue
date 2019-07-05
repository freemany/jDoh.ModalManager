<template>
    <div>
      <button class="btn btn-danger" @click="hideAll">Hide all</button>
      <button class="btn btn-primary" @click="open(1)">Modal 1</button>
        <button class="btn btn-info" @click="openBv(2)">Modal 2</button>
        <button class="btn btn-info" @click="openBv(3)">Modal 3</button>
        <button class="btn btn-info" @click="openBv(4)">Modal 4</button>
        <button class="btn btn-info" @click="openBv(5)">Modal 5</button>
        <modal name="modal1">
            hello, world!
        </modal>
        <b-modal id="modal2" title="Modal 2">
            <p class="my-4">Hello from modal!</p>
        </b-modal>
        <b-modal id="modal3" title="Modal 3">
            <p class="my-4">Hello from modal!</p>
        </b-modal>
        <b-modal id="modal4" title="Modal 4">
            <p class="my-4">Hello from modal!</p>
        </b-modal>
        <b-modal id="modal5" title="Modal 5">
            <p class="my-4">Hello from modal!</p>
        </b-modal>
    </div>
</template>
<script>
    import {showModal, goNextModal, goPrevModal} from '@/lib/modal-manager';

    export default {
        name: 'ModalHolder',
        data() {
            return {};
        },
        mounted() {
            window.open = this.open;
            window.openBv = this.openBv;
            window.hide = this.hide;
            window.next = this.next;
            window.prev = this.prev;
            window.openId = this.openId;
        },
        methods: {
            openId(id) {
                return showModal(id);
            },
            prev() {
                goPrevModal();
            },
            next() {
                goNextModal();
            },
            open(id) {
                showModal({
                    id: 'modal' + id,
                    show: () => this.$modal.show('modal' + id),
                    hide: () => this.$modal.hide('modal' + id),
                });
            },
            openBv(id) {
                this.$bvModal.show('modal' + id);
                const newId = id - 1;
                showModal({
                    id: 'modal' + id,
                    show: () => this.$bvModal.show('modal' + id),
                    hide: () => this.$bvModal.hide('modal' + id),
                    onClose: () => {
                        showModal('modal' + newId);
                    },
                });
            },
            hide() {
                this.$modal.hide('modal1');
            }
        }
    }
</script>
<style>

</style>