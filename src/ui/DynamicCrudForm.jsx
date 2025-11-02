import React, { useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    InputLabel,
  } from "@mui/material";
  import { useForm } from "react-hook-form";

export default function DynamicCrudForm({
    fields = [],
    defaultValues = {},
    mode = "create",
    onSubmit,
  }) {
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
      defaultValues,
    });
  
    const watchedFiles = watch("Image");
  
    useEffect(() => {
      if (mode === "edit" && defaultValues) reset(defaultValues);
    }, [defaultValues, mode, reset]);
  
    const handleFormSubmit = (data) => {
        delete(data._id);
        delete(data.__v);
        delete(data.createdAt);
        delete(data.updatedAt);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        // Handle file logic
        if (key === "Image") {
          const fileList = value;
          if (fileList instanceof FileList && fileList.length > 0) {
            // User selected new file → use that
            formData.append("Image", fileList[0]);
          } else {
            // No new file → keep the existing URL
            if (defaultValues?.Image) {
              formData.append("Image", defaultValues.Image);
            }
          }
        } else {
          formData.append(key, value);
        }
      });
      onSubmit(formData)
    };
  
    return (
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" mb={2}>
          {mode === "edit" ? "Edit Data" : "Create New"}
        </Typography>
  
        <Stack spacing={2}>
          {fields?.map((field) => (
            <Box key={field.name}>
              {field.type === "file" ? (
                <>
                  <InputLabel>{field.label}</InputLabel>
                  <input
                    type="file"
                    accept="image/*"
                    {...register(field.name,mode === "create" ? { required: field.required } : {})}
                    style={{
                      display: "block",
                      marginTop: "8px",
                    }}
                  />

                   {errors[field.name] && (
                      <Typography variant="caption" color="error">
                        {`${field.label} is required`}
                      </Typography>
                    )}
                  {/* Show current image preview or link */}
                  {mode === "edit" && defaultValues?.[field.name] && (
                    <Box mt={1}>
                      <Typography variant="body2" color="text.secondary">
                        Current Image:
                      </Typography>
                      <img
                        src={defaultValues[field.name]}
                        alt="Current"
                        width={120}
                        style={{ borderRadius: 8, marginTop: 6 }}
                      />
                    </Box>
                  )}
  
                  {/* Optional hint */}
                  <Typography variant="caption" color="text.secondary">
                    {mode === "edit"
                      ? "You can upload a new image to replace the current one"
                      : "Upload a new image"}
                  </Typography>
                </>
              ) : (
                <TextField
                  label={field.label}
                  type={field.type || "text"}
                  fullWidth
                  multiline={field.type === "textarea"}
                  rows={field.type === "textarea" ? 4 : 1}
                  {...register(field.name, { required: field.required })}
                  error={!!errors[field.name]}
                  helperText={
                    errors[field.name] && `${field.label} is required`
                  }
                />
              )}
            </Box>
          ))}
  
          <Button
            type="submit"
            variant="contained"
            className="!bg-amber-500 !px-5 !py-5 !text-amber-100 !mt-5 !rounded-2xl !cursor-pointer hover:!bg-amber-600"
            sx={{ mt: 2 }}
          >
            {mode === "edit" ? "Update" : "Create"}
          </Button>
        </Stack>
      </Box>
    );
  }