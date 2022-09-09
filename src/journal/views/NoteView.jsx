import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { useForm } from "../../hooks"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal/thunks"
import { ImageGallery } from "../components"


export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: currentNote, messageSaved, isSaving } = useSelector(state => state.journal);

    const {
        body,
        title,
        date,
        formState,
        onInputChange
    } = useForm(currentNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (messageSaved?.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved])


    const onSaveNote = () => {
        dispatch(startSavingNote(formState));
    }

    const onFileInputChanged = ({ target }) => {

        if (target.files.length === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid container direction="row" justifyContent="space-between" sx={{ mb: 1 }}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid item>
                <Typography
                    fontSize={39}
                    fontWeight='light'
                >
                    {dateString}
                </Typography>
            </Grid>

            <Grid item>

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadFileOutlined />
                </IconButton>

                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChanged}
                    style={{ display: "none" }}
                />

                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Que sucedio en el dia de hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent="end">
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            {/* Galeria de imagenes */}
            {
                (!!currentNote?.imageUrls) && <ImageGallery images={currentNote.imageUrls} />
            }
        </Grid>
    )
}