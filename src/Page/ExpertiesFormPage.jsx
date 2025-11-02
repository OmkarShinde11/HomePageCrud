import React from 'react'
import useExperties from '../feature/Experties/useExperties'
import TableCmp from '../ui/TableCmp';
import { CircularProgress } from '@mui/material';
import DynamicCrudForm from '../ui/DynamicCrudForm';
import useCrudHandler from '../hooks/useCrudHook';
import useCreateHandaller from '../hooks/useCreateDocHook';
import useUpdateExperties from '../feature/Experties/useUpdateExperties';
import useCreateExperties from '../feature/Experties/useCreateExperties';
import useDeleteExperties from '../feature/Experties/useDeleteExperties';
import useReorderExperties from '../feature/Experties/useReorderExperties';


const expertiesField=[
  { name: "Image", label: "Image", type: "file", required: true },
  { name: "title", label: "title", type: "text", required: true },
  { name: "description", label: "description", type: "text",required:true},
]

export default function ExpertiesFormPage() {
    const {isLoading,expertiesData=[]}=useExperties();
    const {isUpdating,updateExperties}=useUpdateExperties();
    const {isCreating,createExperties}=useCreateExperties();
    const {isDeleting,deleteExperties}=useDeleteExperties();
    const {isEdit,editData,handleEdit,handleUpdate,}=useCrudHandler(updateExperties);
    const {isCreate,handleCreate,handleCreation}=useCreateHandaller(createExperties);
    const {isReorder,reorderExperties}=useReorderExperties();

    function handleDelete(row){
      console.log(row);
      deleteExperties(row?._id);
  };

  function handleReorder(data){
    reorderExperties(data);
  }

  function handleEditExclusive(row) {
    if (isCreate) handleCreate(); // Close create form if open
    handleEdit(row);
  }

  function handleCreateExclusive() {
    if (isEdit) handleEdit({ _id: undefined }); // Close edit form if open
    handleCreate();
  }

  if(isLoading || isUpdating || isCreating || isDeleting || isReorder) return (
    <div className="flex justify-center items-center h-64">
      <CircularProgress />
    </div>
  )
  return (
    <>
    <TableCmp data={expertiesData} columns={['Image','title','description']}  onDelete={handleDelete} onEdit={handleEditExclusive} onCreate={handleCreateExclusive} reOrderData={handleReorder}></TableCmp>
    {isEdit &&
    <DynamicCrudForm key="create-form" fields={expertiesField} mode='edit' defaultValues={editData} onSubmit={handleUpdate}/>
    }
    {isCreate && 
    <DynamicCrudForm key="edit-form"  mode="create" fields={expertiesField} onSubmit={handleCreation}/>
    }
    </>
  )
}
