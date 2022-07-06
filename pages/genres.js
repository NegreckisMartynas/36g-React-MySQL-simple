import { useEffect, useState } from "react";

export default function Genres() {
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
                    <th>Žanras</th>
                    <th>Iš viso knygų</th>
                </tr>
            </thead>
            <tbody>
                {data.map(Row)}
            </tbody>
        </table>
    );
}

const Title = () => <h1>Mano žanrai</h1>

const Row = (element, i) => (
    <tr key={i}>
        <td>{element.genre_id}</td>
        <td>{element.name}</td>
        <td>{element.books_count}</td>
    </tr>
)

async function getData() {
    const result = await fetch('/api/genres').then(res => res.json());
    console.log(result[0])
    return result;
}
