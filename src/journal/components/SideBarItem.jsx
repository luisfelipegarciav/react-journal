import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const newTile = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title
    }
        , [title]);

    const onNoteClick = () => {
        dispatch(setActiveNote({ title, body, id, date, imageUrls }));
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onNoteClick}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTile}></ListItemText>
                    <ListItemText secondary={body}></ListItemText>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
