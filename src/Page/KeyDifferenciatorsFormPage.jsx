import React, { useRef, useState } from 'react'
import useKeyDifferenciators from '../feature/KeyDifferenciators/useKeyDifferenciators'
import { CircularProgress } from '@mui/material';
import TableCmp from '../ui/TableCmp';
import DynamicCrudForm from '../ui/DynamicCrudForm';
import useUpdateKeyDifferenciators from '../feature/KeyDifferenciators/useUpdateDifferenciators';
import useCrudHandler from '../hooks/useCrudHook';
import useCreateHandaller from '../hooks/useCreateDocHook';
import useCreateDifferenciators from '../feature/KeyDifferenciators/useCreateDifferenciators';
import useDeleteDifferenciators from '../feature/KeyDifferenciators/useDelteDifferenciators';
import useReorderDifferenciators from '../feature/KeyDifferenciators/useReorderKeyDifferenciators';

const keyDifferentiator=[
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required:true },
  { name: "Image", label: "Image", type: "file", required: true  },
];
export default function KeyDifferenciatorsFormPage() {

  const {isLoading,differenciators=[]}=useKeyDifferenciators();
  const {isUpdating,updateDifferenciators}=useUpdateKeyDifferenciators();
  const {isEdit,editData,handleEdit,handleUpdate}=useCrudHandler(updateDifferenciators);
  const {isCreating,createDifferenciators}=useCreateDifferenciators();
  const {isCreate,handleCreate,handleCreation}=useCreateHandaller(createDifferenciators);
  const {isDeleting,deleteDifferenciators}=useDeleteDifferenciators();
  const {isReorder,reorderKeyDifferenciators}=useReorderDifferenciators();
  function handleDelete(row){
    console.log(row);
    deleteDifferenciators(row?._id);
};
function handleReorder(data){
  reorderKeyDifferenciators(data);
}
function handleEditExclusive(row) {
  if (isCreate) handleCreate(); // Close create form if open
  handleEdit(row);
}

function handleCreateExclusive() {
  if (isEdit) handleEdit({ _id: undefined }); // Close edit form if open
  handleCreate();
}

    if(isLoading || isUpdating || isCreating || isDeleting || isReorder) return(
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    )
  return (
    <>
    <TableCmp data={differenciators} columns={['Image','title','description']} onEdit={handleEditExclusive} onCreate={handleCreateExclusive} onDelete={handleDelete} reOrderData={handleReorder}></TableCmp>
    {isEdit && 
    <DynamicCrudForm key="create-form" fields={keyDifferentiator} mode='edit' defaultValues={editData} onSubmit={handleUpdate}/>
    }
    {isCreate && 
    <DynamicCrudForm key="edit-form" fields={keyDifferentiator} onSubmit={handleCreation}/>
    }
    </>
  )
}
