import React from "react";
import { useParams } from "react-router-dom";
import { useShow } from "../../misc/custom-hooks";
import Cast from "../Show/Cast";
import Details from "../Show/Details";
import Seasons from "../Show/Seasons";
import ShowMainData from "../Show/ShowMainData";
import { ShowPageWrapper , InfoBlock } from "./Show.styled";



const Show = () => {
  const { id } = useParams();
  const {show, isLoading,error} = useShow(id);

  if (isLoading) return <div>Data is being loaded.</div>;

  if (error) return <div>There is some error: {error}</div>;

  return (
    <ShowPageWrapper>
      <ShowMainData
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
        image={show.image}
      />

      <InfoBlock>
        <h1>Details</h1>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>
      <InfoBlock>
        <h1>Seasons</h1>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h1>Cast</h1>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
