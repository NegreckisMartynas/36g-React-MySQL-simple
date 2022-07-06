import React, { useEffect, useState } from "react";
import { A11yDialog } from 'react-a11y-dialog'

export default function Books() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [editContent, setEditContent] = useState(null);
    const dialog = React.useRef();
    
    useEffect(() => {
        getData(page).then(d => setData(d));
    }, [])

    const changePage = (p) => {
        console.log('Change page:', p )
        setPage(p);
        getData(p).then(d => setData(d))
    }

    const showEditDialog = (entry) => {
        setEditContent(
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
                <button type="submit">Išsaugoti</button>
            </div>
        )
        dialog.current.show()
    }

    const EditButton = (params) => (
        <button onClick={() => showEditDialog(params)}>Edit</button>
    )

    return (
        <div>
            <Title></Title>
            <Table data={data} editButton={EditButton}></Table>
            <Pager page={page} setPage={changePage}></Pager>
            <EditDialog
                dialogRef={instance => dialog.current = instance}
                instance={dialog.current}
                onSubmit={() => changePage(page)}
                title="editBook">
                {editContent}
            </EditDialog>
            
        </div>
    )
}

const Table = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Pavadinimas</th>
                    <th>Žanras</th>
                    <th>Parašymo metai</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((e, i) => Row(e, i, [props.editButton]))}
            </tbody>
        </table>
    );
}

const Title = () => <h1>Mano knygos</h1>

const Row = (element, i, buttons) => (
    <tr key={i}>
        <td>{element.book_id}</td>
        <td>{element.title}</td>
        <td>{element.name}</td>
        <td>{element.release_year}</td>
        <td>
            {buttons[0](element)}
            <button>Delete</button>
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
    const submit = (event) => {
        event.preventDefault();
        const object = {};
        new FormData(event.target).forEach((value, key) => object[key] = value);

        fetch('/api/books/edit', {
            method: 'POST',
            body: JSON.stringify(object)
        }).then(() => {
            props.onSubmit();
            props.instance.hide();
        })
    }

    return (
        <Dialog id='edit'
            dialogRef={props.dialogRef}
            title='Edit book'>
            <form method="post" action="/api/books/edit" onSubmit={submit}>
                <h4>Edit Book</h4>
                {props.children}
            </form>
        </Dialog>
    )
}