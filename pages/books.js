import { useEffect, useState } from "react";

export default function Books() {
    return (
        <div>
            <Title></Title>
            <Table></Table>
        </div>
    )
}

const Table = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        getData().then(d => setData(d));
    }, [])

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
                {data.map(Row)}
            </tbody>
        </table>
    );
}

const Title = () => <h1>Books</h1>

const Row = (element, i) => (
    <tr key={i}>
        <td>{element.book_id}</td>
        <td>{element.title}</td>
        <td>{element.name}</td>
        <td>{element.release_year}</td>
    </tr>
)

async function getData() {
    const result = await fetch('/api/books').then(res => res.json());
    console.log(result[0])
    return result;
}