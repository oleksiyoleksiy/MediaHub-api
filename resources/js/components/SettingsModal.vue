<template>
  <CModal
    :visible="visible"
    @close="close"
    aria-labelledby="modal-title"
  >
    <CModalHeader>
      <CModalTitle id="modal-title">{{ modalTitle }}</CModalTitle>
    </CModalHeader>
    <CModalBody v-if="type !== 'delete'">
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
    <CModalBody v-else>
      Are you sure you want to delete this record?
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="close">Cancel</CButton>
      <CButton
        v-if="type === 'delete'"
        color="danger"
        @click="emitDelete"
      >
        Delete
      </CButton>
      <CButton
        v-else
        color="primary"
        @click="emitSave"
      >
        Save
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormInput, CButton } from '@coreui/vue';

export default {
  props: {
    type: { type: String, required: true }, // 'add', 'edit', 'delete'
    visible: { type: Boolean, required: true },
    data: { type: Object, required: true },
  },
  emits: ['close', 'save', 'delete'],
  setup(props, { emit }) {
    const formData = ref({});

    watch(
      () => props.data,
      (newData) => {
        formData.value = { ...newData };
      },
      { immediate: true }
    );

    const close = () => emit('close');
    const emitSave = () => emit('save', formData.value);
    const emitDelete = () => emit('delete', formData.value.id);

    const modalTitle = computed(() => {
      if (props.type === 'add') return 'Add New Record';
      if (props.type === 'edit') return 'Edit Record';
      return 'Delete Record';
    });

    return {
      formData,
      close,
      emitSave,
      emitDelete,
      modalTitle,
    };
  },
};
</script>
