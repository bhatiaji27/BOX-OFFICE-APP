import React, { useState, useEffect } from "react";
import { useShows } from "../../misc/custom-hooks";
import MainPageLayout from "../UI/MainPageLayout";
import { apiGet } from "../../misc/config";
import ShowGrid from "../Show/ShowGrid";

function Starred() {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((showId) => apiGet(`/shows/${showId}`));

      Promise.all(promises)
        .then((apiData) => apiData.map((show) => ({ show })))
        .then((results) => {
          setShows(results);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are Loading.</div>}
      {error && <div>No shows found.</div>}
      {!isLoading && !shows && <div>No Shows were Added</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
}

export default Starred;
