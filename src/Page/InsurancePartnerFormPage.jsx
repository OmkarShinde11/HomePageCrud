import React from 'react'
import useInsurance from '../feature/Insurance/useInsurance'
import TableCmp from '../ui/TableCmp';
import { CircularProgress } from '@mui/material';
import useCreateInsurance from '../feature/Insurance/useCreateInsurance';
import useDeleteInsurance from '../feature/Insurance/useDeleteInsurance';
import useUpdateInsurance from '../feature/Insurance/useUpdateInsurance';
import useCrudHandler from '../hooks/useCrudHook';
import useCreateHandaller from '../hooks/useCreateDocHook';
import DynamicCrudForm from '../ui/DynamicCrudForm';
import useReorderInsurance from '../feature/Insurance/useReorderInsurance';

const insuranceField=[
  { name: "Image", label: "Image", type: "file", required: true }
]

export default function InsurancePartnerFormPage() {
    const {isLoading,insuranceData=[]}=useInsurance();
    const {isUpdating,updateInsurance}=useUpdateInsurance();
    const {isCreating,createInsurance}=useCreateInsurance();
    const {isDeleting,deleteInsurance}=useDeleteInsurance();
    const {isEdit,editData,handleEdit,handleUpdate,}=useCrudHandler(updateInsurance);
    const {isCreate,handleCreate,handleCreation}=useCreateHandaller(createInsurance);
    const {isReorder,reorderInsurance}=useReorderInsurance();
    function handleDelete(row){
      console.log(row);
      deleteInsurance(row?._id);
  };

  function handleReorder(data){
    reorderInsurance(data);
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
    <TableCmp data={insuranceData} columns={['Image']} onDelete={handleDelete} onEdit={handleEditExclusive} onCreate={handleCreateExclusive} reOrderData={handleReorder}></TableCmp>
    {isEdit &&
    <DynamicCrudForm key="create-form" fields={insuranceField} mode='edit' defaultValues={editData} onSubmit={handleUpdate}/>
    }
    {isCreate && 
    <DynamicCrudForm key="edit-form"  mode="create" fields={insuranceField} onSubmit={handleCreation}/>
    }
    </>
  )
}
