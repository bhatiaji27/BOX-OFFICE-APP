import React from "react";
import ShowCard from "./ShowCard";
import notFoundImage from "../../images/not-found.png";
import { FlexGrid } from "../UI/styled";

import { useShows } from "../../misc/custom-hooks";

const ShowGrid = ({ data }) => {
  const [starredShows, dispatchStarred] = useShows();

  return (
    <FlexGrid>
      {data.map(({ show }) => {

        const isStarred = starredShows.includes(show.id);

        const onStarClickHandler = () => {
          if(isStarred) {
            dispatchStarred({type: 'REMOVE', showId: show.id})
          } else {
            dispatchStarred({type: 'ADD', showId: show.id})
          }
        }

        return (
          <ShowCard
            key={show.id}
            id={show.id}
            image={show.image ? show.image.medium : notFoundImage}
            name={show.name}
            summary={show.summary}
            onStarClick={onStarClickHandler}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
