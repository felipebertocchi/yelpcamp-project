import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Component() {
    const { campgroundId } = useParams();
    const [campground, setCampground] = useState([]);

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:4000/campgrounds/${campgroundId}`)
                .then(response => {
                    setCampground(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getData();
    }, [])

    return (
        <>
            {campground &&
                <h1>{campground.title}</h1>
            }
        </>
    )
}