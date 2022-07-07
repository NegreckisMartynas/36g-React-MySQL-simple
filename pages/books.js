import React, { useEffect, useState } from "react";
import { A11yDialog } from 'react-a11y-dialog'

export default function Books() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [selectedEntry, setEntry] = useState({})
    const dialog = React.useRef();
    
    useEffect(() => {
        getData(page).then(d => setData(d));
        getGenres().then(d => setGenres(d));
    }, [])

    const changePage = (p) => {
        setPage(p);
        getData(p).then(d => setData(d))
    }

    const deleteElement = (entry) => deleteBook(entry, () => changePage(p));

    const showEditDialog = (entry) => {
        setEntry(entry);
        dialog.current.show();
    }

    const Button = (callback, title) => (entry) => (
        <button onClick={() => callback(entry)}>{title}</button>
    )
    const EditButton = Button(showEditDialog, 'Edit');
    const DeleteButton = Button(deleteElement, 'Delete');

    return (
        <div>
            <Title></Title>
            <Table data={data} editButton={EditButton} deleteButton={DeleteButton}></Table>
            <Pager page={page} setPage={changePage}></Pager>
            <EditDialog
                dialogRef={instance => dialog.current = instance}
                genres={genres}
                entry={selectedEntry}
                instance={dialog.current}
                onSubmit={() => changePage(page)}
                title="editBook">
            </EditDialog>
        </div>
    )
}

const Table = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Pavadinimas</th>
                    <th>Žanras</th>
                    <th>Parašymo metai</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((e, i) => Row(e, i, [props.editButton, props.deleteButton]))}
            </tbody>
        </table>
    );
}

const Title = () => <h1>Mano knygos</h1>

const Row = (element, i, buttons) => (
    <tr key={i}>
        <td>{element.title}</td>
        <td>{element.genre}</td>
        <td>{element.release_year}</td>
        <td>
            {buttons[0](element)}
            {buttons[1](element)}
        </td>
    </tr>
)

const Pager = (props) => {
    return (
        <div className="pager">
            <button onClick={()=>props.setPage(props.page-1)}>&lt;</button>
            <span>{props.page}</span>
            <button onClick={()=>props.setPage(props.page+1)}>&gt;</button>
        </div>
    )
}

async function getData(page) {
    const result = await fetch(`/api/books?page=${page}`).then(res => res.json());
    console.log(result[0])
    return result;
}

async function getGenres() {
    const result = await fetch(`/api/genres`).then(res => res.json());
    console.log(result[0])
    return result;
}


const Dialog = (props) => {
    return (
        <A11yDialog id={props.id}
            dialogRef={props.dialogRef}
            title={props.title}
            classNames={{
                container: "dialog-container",
                overlay: "dialog-overlay",
                dialog: "dialog-content",
                closeButton: "dialog-close"
            }}>
            {props.children}
        </A11yDialog>
    )
}

const EditDialog = (props) => {
    const reloadAndHide = () => {
        props.onSubmit();
        props.instance.hide();
    }
    const submit = ( event ) => submitEditForm(event, reloadAndHide)

    const {entry, genres, dialogRef} = props;

    return (
        <Dialog id='edit'
            dialogRef={dialogRef}
            title='Edit book'>
            <form method="post" action="/api/books/edit" onSubmit={submit}>
                <h4>Edit Book</h4>
                <div>
                    <input key={entry.book_id} type="hidden" name="book_id" defaultValue={entry.book_id}></input>
                    <div key={entry.title}>
                        <label htmlFor="title_input">Pavadinimas: </label>
                        <input id="title_input" type="text" name="title" defaultValue={entry.title}/>
                    </div>
                    <div key={entry.release_year}>
                        <label htmlFor="year_input">Parašymo metai: </label>
                        <input id="year_input" type="number" name="release_year" defaultValue={entry.release_year ?? ''}/>
                    </div>
                    <div key={'genre_'+entry.genre_id}>
                        <label htmlFor="genre_input">Parašymo metai: </label>
                        <select id="genre_input" name="genre">
                            {genres.map(genre => (
                                <option value={genre.genre_id} selected={genre.genre_id === entry.genre_id}>{genre.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Išsaugoti</button>
                </div>
            </form>
        </Dialog>
    )
}

const submitEditForm = (event, callback) => {
    event.preventDefault();
    const formData = {};
    new FormData(event.target).forEach((value, key) => formData[key] = value);

    fetch('/api/books/edit', {
        method: 'POST',
        body: JSON.stringify(formData)
    }).then(callback)
}

const deleteBook = (book, onDelete) => {
    const result = confirm(`Ar tikrai norite ištrinti "${book.title}"`);
    if(result) {
        fetch('/api/books/delete', {
            method: 'DELETE',
            body: book.book_id
        }).then(onDelete)
    }
}