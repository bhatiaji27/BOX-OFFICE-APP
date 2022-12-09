import React, { useState } from "react";
import MainPageLayout from "../UI/MainPageLayout";
import { apiGet } from "../../misc/config";
import ShowGrid from "../Show/ShowGrid";
import ActorGrid from "../Actor/ActorGrid";
import { useLastQuery } from "../../misc/custom-hooks";
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from "./Home.styled";
import CustomRadio from "../UI/CustomRadio";

function Home() {
  const [inputText, setInputText] = useLastQuery();
  const [result, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowsChecked = searchOption === "shows";

  const onRadioChangeHandler = (event) => {
    setSearchOption(event.target.value);
  };

  const onInputChangeHandler = (event) => {
    setInputText(event.target.value);
  };
  const onButtonClickHandler = () => {
    //https://api.tvmaze.com/search/shows?q=girls
    apiGet(`/search/${searchOption}?q=${inputText}`).then((res) => {
      setResult(res);
    });
  };
  const onKeyDownHandler = (event) => {
    if (event.keyCode === 13) onButtonClickHandler();
  };

  const renderResults = () => {
    if (result && result.length === 0) return <div>No results found.</div>;
    if (result && result.length > 0) {
      return result[0].show ? (
        <ShowGrid data={result} />
      ) : (
        <ActorGrid data={result} />
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        onKeyDown={onKeyDownHandler}
        onChange={onInputChangeHandler}
        value={inputText}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio 
            label="Shows"
            id="shows-search"
            checked={isShowsChecked}
            value="shows"
            onChange={onRadioChangeHandler}
          />
        </div>
        <div>
          <CustomRadio
              label="Actors"
              id="actors-search"
              checked={!isShowsChecked}
              value="people"
              onChange={onRadioChangeHandler}
            />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onButtonClickHandler}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
}

export default Home;
