<template>
    <CModal :visible="visible" @close="close" aria-labelledby="modal-title">
        <CModalHeader>
            <CModalTitle id="modal-title">Edit settings</CModalTitle>
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
            <CButton color="primary" @click="handleUpdateButtonClick">
                Update
            </CButton>
        </CModalFooter>
    </CModal>
</template>

<script>
import { ref, watch } from "vue";
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
        data: {
            type: Object,
            default: () => ({ type: "", name: "", content: "" }),
        },
    },
    emits: ["close"],
    setup(props, { emit }) {
        const formData = ref({ ...props.data });

        watch(
            () => props.data,
            (newValue) => {
                formData.value = { ...newValue };
            },
            { immediate: true, deep: true }
        );

        const settingsStore = useSettingsStore();

        const close = () => {
            formData.value = { ...props.data };
            emit("close");
        };
        const handleUpdateButtonClick = async () => {
            const response = await settingsService.update(
                formData.value,
                props.data.id
            );

            if (response) {
                settingsStore.updateSettings(response);
                close();
            }
        };

        return {
            formData,
            close,
            handleUpdateButtonClick,
        };
    },
};
</script>
