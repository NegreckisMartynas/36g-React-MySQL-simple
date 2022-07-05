import { useEffect, useState } from "react";

export default function Authors() {
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
                    <th>Vardas</th>
                </tr>
            </thead>
            <tbody>
                {data.map(Row)}
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

async function getData() {
    const result = await fetch('/api/authors').then(res => res.json());
    console.log(result[0])
    return result;
}
