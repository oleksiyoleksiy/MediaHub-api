<template>
    <CModal :visible="visible" @close="close" aria-labelledby="modal-title">
        <CModalHeader>
            <CModalTitle id="modal-title">Create new settings</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CFormInput
                label="Type"
                v-model="formData.type"
                type="text"
                placeholder="Enter type"
            />
            <CFormInput
                label="Name"
                v-model="formData.name"
                type="text"
                placeholder="Enter name"
            />
            <CFormInput
                label="Content"
                v-model="formData.content"
                type="text"
                placeholder="Enter content"
            />
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" @click="close">Cancel</CButton>
            <CButton color="primary" @click="handleCreateButtonClick">
                Create
            </CButton>
        </CModalFooter>
    </CModal>
</template>

<script>
import { computed, ref } from "vue";
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormInput,
    CButton,
} from "@coreui/vue";
import settingsService from "../../services/settingsService";
import { useSettingsStore } from "../../store/settings";

export default {
    props: {
        visible: { type: Boolean, required: true },
    },
    emits: ["close"],
    setup(props, { emit }) {
        const formData = ref({ type: "", name: "", content: "" });
        const settingsStore = useSettingsStore();

        const close = () => emit("close");

        const handleCreateButtonClick = async () => {
            const response = await settingsService.store(formData.value);

            if (response) {
                settingsStore.addSettings(response);
                close();
            }
        };

        return {
            formData,
            close,
            handleCreateButtonClick,
        };
    },
};
</script>
