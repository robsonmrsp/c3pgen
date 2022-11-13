import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

export const ActionCell = ({ row, onDelete, onEdit }) => {
  return (
    <Stack direction="row" spacing={0}>
      <Button
        variant="text"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={(event) => {
          onDelete(row);
        }}
      />
      <Button
        variant="text"
        size="small"
        endIcon={<EditIcon />}
        onClick={(event) => {
          onEdit(row);
        }}
      />
    </Stack>
  );
}