<template>
    <div class="d-flex flex-column gap-3">
        <div>
            <CButton
                color="primary"
                @click="handleAddSettingsButtonClick"
            >
                Add Settings
            </CButton>
        </div>
        <CTable>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Type</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Content</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow
                    v-for="(row, index) in settings"
                    :key="row.id || index"
                >
                    <CTableHeaderCell>{{ index + 1 }}</CTableHeaderCell>
                    <CTableDataCell>{{ row.type }}</CTableDataCell>
                    <CTableDataCell>{{ row.name }}</CTableDataCell>
                    <CTableDataCell>{{ row.content }}</CTableDataCell>
                    <CTableDataCell class="d-flex gap-1">
                        <CButton
                            color="primary"
                            @click="handleEditSettingsButtonClick(row)"
                        >
                            <BIconPencilFill />
                        </CButton>
                        <CButton
                            color="danger"
                            @click="handleDeleteSettingsButtonClick(row)"
                        >
                            <BIconTrashFill color="white" />
                        </CButton>
                    </CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>

        <!-- <SettingsModal
            :type="modalType"
            :visible="modalVisible"
            :data="selectedRow"
            @close="closeModal"
            @save="handleSave"
            @delete="handleDelete"
        /> -->
        <CreateSettings
            :visible="createSettingsModalVisible"
            @close="handleCloseCreateSettingsModal"
        />
        <EditSettings
            :visible="editSettingsModalVisible"
            :data="selectedRow"
            @close="handleCloseEditSettingsModal"
        />
        <DeleteSettings
            :visible="deleteSettingsModalVisible"
            :id="selectedRow?.id"
            @close="handleCloseDeleteSettingsModal"
        />
    </div>
</template>

<script>
import { computed, ref } from "vue";
import {
    CTable,
    CTableHead,
    CTableBody,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
    CButton,
} from "@coreui/vue";
import { BIconPencilFill, BIconTrashFill } from "bootstrap-icons-vue";
import SettingsModal from "../components/SettingsModal.vue";
import settingsService from "../services/settingsService";
import { useSettingsStore } from "../store/settings";
import CreateSettings from "../components/Settings/CreateSettings.vue";
import EditSettings from "../components/Settings/EditSettings.vue";
import DeleteSettings from "../components/Settings/DeleteSettings.vue";

export default {
    components: {
        CTable,
        CTableHead,
        CTableBody,
        CTableRow,
        CTableHeaderCell,
        CTableDataCell,
        CButton,
        BIconPencilFill,
        BIconTrashFill,
        CreateSettings,
        EditSettings,
        DeleteSettings
    },
    setup() {
        const settingsStore = useSettingsStore();
        const settings = computed(() => settingsStore.settings);
        const createSettingsModalVisible = ref(false);
        const editSettingsModalVisible = ref(false);
        const deleteSettingsModalVisible = ref(false);
        const selectedRow = ref(null);

        const handleAddSettingsButtonClick = () => {
            createSettingsModalVisible.value = true;
        };

        const handleCloseCreateSettingsModal = () => {
            createSettingsModalVisible.value = false;
        };
        const handleEditSettingsButtonClick = (row) => {
            selectedRow.value = row;
            editSettingsModalVisible.value = true;
        };

        const handleCloseEditSettingsModal = () => {
            editSettingsModalVisible.value = false;
        };
        const handleDeleteSettingsButtonClick = (row) => {
            selectedRow.value = row;
            deleteSettingsModalVisible.value = true;
        };

        const handleCloseDeleteSettingsModal = () => {
            deleteSettingsModalVisible.value = false;
        };

        return {
            settings,
            selectedRow,
            handleAddSettingsButtonClick,
            handleCloseCreateSettingsModal,
            handleEditSettingsButtonClick,
            handleCloseEditSettingsModal,
            handleDeleteSettingsButtonClick,
            handleCloseDeleteSettingsModal,
            createSettingsModalVisible,
            editSettingsModalVisible,
            deleteSettingsModalVisible,
        };
    },
};
</script>
