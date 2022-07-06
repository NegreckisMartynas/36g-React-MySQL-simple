import { useEffect, useState } from "react";

export default function Books() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1)
    
    useEffect(() => {
        getData(page).then(d => setData(d));
    }, [])

    const changePage = (p) => {
        setPage(p);
        getData(p).then(d => setData(d))
    }

    return (
        <div>
            <Title></Title>
            <Table data={data}></Table>
            <Pager page={page} setPage={changePage}></Pager>
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
                {props.data.map(Row)}
            </tbody>
        </table>
    );
}

const Title = () => <h1>Mano knygos</h1>

const Row = (element, i) => (
    <tr key={i}>
        <td>{element.book_id}</td>
        <td>{element.title}</td>
        <td>{element.name}</td>
        <td>{element.release_year}</td>
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
