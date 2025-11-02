import React, { useRef, useState } from 'react';
import useBanners from '../feature/Banner/useBanner'
import TableCmp from '../ui/TableCmp';
import { CircularProgress } from '@mui/material';
import useDeleteBanner from '../feature/Banner/useDeleteBanner';
import DynamicCrudForm from '../ui/DynamicCrudForm';
import useUpdateBanner from '../feature/Banner/useUpdateBanner';
import useCrudHandler from '../hooks/useCrudHook';
import useCreateHandaller from '../hooks/useCreateDocHook';
import useCreateBanner from '../feature/Banner/useCreateBanner';
import useReorderBanner from '../feature/Banner/useReorderBanner';

const bannerFields= [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "subtitle", label: "Subtitle", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "ctaText", label: "CTA Text", type: "text",required: true },
    { name: "ctaLink", label: "CTA Link", type: "text",required: true },
    { name: "Image", label: "Image", type: "file", required: true },
  ]
export default function BannerFormPage() {
    const {isLoading,bannerData=[]}=useBanners();
    const {isDeleting,deleteBanner}=useDeleteBanner();
    const {isUpdating,updateBanner}=useUpdateBanner();
    const {isCreating,createBanner}=useCreateBanner();
    const {isReorder,reorderBanner}=useReorderBanner();
    const {isEdit,editData,handleEdit,handleUpdate,}=useCrudHandler(updateBanner)
    const {isCreate,handleCreate,handleCreation}=useCreateHandaller(createBanner);
    if(isLoading || isDeleting || isUpdating || isCreating || isReorder) return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    )
    function handleDelete(row){
        console.log(row);
        deleteBanner(row?._id);
    };

    function handleReorder(data){
      reorderBanner(data);
    };

    function handleEditExclusive(row) {
      if (isCreate) handleCreate(); // Close create form if open
      handleEdit(row);
    }
  
    function handleCreateExclusive() {
      if (isEdit) handleEdit({ _id: undefined }); // Close edit form if open
      handleCreate();
    }
  return (
    <>
    <TableCmp data={bannerData} columns={['Image','title','subtitle','description','ctaText','ctaLink']} onDelete={handleDelete} onEdit={handleEditExclusive} onCreate={handleCreateExclusive} reOrderData={handleReorder}/>
    {isEdit &&
    <DynamicCrudForm key="create-form" fields={bannerFields} mode='edit' defaultValues={editData} onSubmit={handleUpdate}/>
    }
    {isCreate && 
    <DynamicCrudForm key="edit-form"  mode="create" fields={bannerFields} onSubmit={handleCreation}/>
    }
    </>
  )
}
