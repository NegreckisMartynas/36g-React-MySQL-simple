import { useEffect, useState } from "react";

export default function Authors() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        getData(page).then(d => setData(d));
    }, [])

    const changePage = (p) => {
        setPage(p);
        getData(p).then(setData);
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
                    <th>Vardas</th>
                    <th>Knygos</th>
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
        <td>{element.author_id}</td>
        <td>{element.name}</td>
        <td>{element.books.join(' 🞄 ')}</td>
    </tr>
)

async function getData(page) {
    const result = await fetch(`/api/authors?page=${page}`).then(res => res.json());
    return result;
}


const Pager = (props) => {
    return (
        <div className="pager">
            <button onClick={()=>props.setPage(props.page-1)}>&lt;</button>
            <span>{props.page}</span>
            <button onClick={()=>props.setPage(props.page+1)}>&gt;</button>
        </div>
    )
}