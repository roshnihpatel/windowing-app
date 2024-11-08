import { useState, useEffect } from "react";

const loadJSON = key =>  key && JSON.parse(sessionStorage.getItem(key));

const saveJSON = (key, data) => sessionStorage.setItem(key, JSON.stringify(data));
 
export default function GitHubUser({ login }) {
    console.log(login)
    const [data, setData] = useState(loadJSON(`user:${login}`));
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useState(() => {
        if (!data) return;
        if (data.login === login) return;
        const { name, login, avatar_url, location } = data;
        saveJSON(`user:${login}`, {
            name,
            login,
            avatar_url,
            location,  
        });
    }, [data])

    useEffect(() => {
        if (!login) return;
        if( data && data.login === login) return;
        setLoading(true);
        fetch(`https://api.github.com/users/${login}`)
        .then(response => response.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch(setError);
    },[login]);

    if (loading) return <h1>Loading ...</h1>;

    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

    if (!data) return null;

    return (
        <div className="githubuser">
            <img
                src={data.avatar_url}
                alt={data.login}
                style={{ width: 200 }}
            />
            <div>
                <h1>{data.login}</h1>
                {data.name && <p>{data.name}</p>}
                {data.location && <p>{data.location}</p>}
            </div>
            <div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    )
}
