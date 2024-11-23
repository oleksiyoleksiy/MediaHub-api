<template>
    <CModal :visible="visible" @close="close" aria-labelledby="modal-title">
        <CModalHeader>
            <CModalTitle id="modal-title">Delete Settings</CModalTitle>
        </CModalHeader>
        <CModalBody>
            {{ modalContent }}
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" @click="close">Cancel</CButton>
            <CButton
                color="danger"
                class="text-white"
                @click="handleDeleteButtonClick"
            >
                Delete
            </CButton>
        </CModalFooter>
    </CModal>
</template>

<script>
import { computed } from "vue";
import { useSettingsStore } from "../../store/settings";
import settingsService from "../../services/settingsService";

export default {
    props: {
        visible: { type: Boolean, required: true },
        id: { type: Number, required: true },
    },
    emits: ["close", "deleted"],
    setup(props, { emit }) {
        const settingsStore = useSettingsStore();

        const modalContent = computed(() =>
            settingsStore.getSettingContent("settings.modal.delete", "text")
        );

        const close = () => emit("close");

        const handleDeleteButtonClick = async () => {
            const response = await settingsService.destroy(props.id);

            if (response) {
                settingsStore.deleteSettings(props.id);
                emit("deleted", props.id);
                close();
            }
        };

        return {
            modalContent,
            close,
            handleDeleteButtonClick,
        };
    },
};
</script>
