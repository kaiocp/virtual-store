import React from "react";
import { useParams } from "react-router-dom";

export default function SearchResults () {
    let { query } = useParams();
    return (
        <p>{query}</p>
    )
}