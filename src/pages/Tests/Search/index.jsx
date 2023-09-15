import React from "react";
import { useSearchParams } from 'react-router-dom';
// import "@elastic/eui/dist/eui_theme_light.css";

// import ElasticSearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
// import moment from "moment";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
//   SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import {
  BooleanFacet,
  Layout,
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

import { config } from "./config";


const SORT_OPTIONS = [
  {
    name: "Relevance",
    value: []
  },
  {
    name: "Label",
    value: [
      {
        field: "label.keyword",
        direction: "asc"
      }
    ]
  },
  {
    name: "State -> Title",
    value: [
      {
        field: "states.keyword",
        direction: "asc"
      },
      {
        field: "title.keyword",
        direction: "asc"
      }
    ]
  },
  {
    name: "Heritage Site -> State -> Title",
    value: [
      {
        field: "world_heritage_site.keyword",
        direction: "asc"
      },
      {
        field: "states.keyword",
        direction: "asc"
      },
      {
        field: "title.keyword",
        direction: "asc"
      }
    ]
  }
];

export default function Search() {
    // Get search query
    const [searchParams, setSearchParams] = useSearchParams();
    let query = '';
    for (const [key, value] of searchParams.entries()) {
        if (key == 'q') {
            query = value;
        }
    }

  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div>
              <ErrorBoundary>
                <Layout
                  header={
                    <h2 className='page_title'>Searched term: <span>{query}</span></h2>
                  }
                //   header={
                //     <SearchBox
                //       autocompleteMinimumCharacters={3}
                //       autocompleteResults={{
                //         linkTarget: "_blank",
                //         sectionTitle: "Results",
                //         titleField: "label",
                //         urlField: "",
                //         shouldTrackClickThrough: true,
                //         clickThroughTags: ["test"]
                //       }}
                //       autocompleteSuggestions={true}
                //       debounceLength={0}
                //     />
                //   }
                  sideContent={
                    <div>
                      {wasSearched && (
                        <Sorting label={"Sort by"} sortOptions={SORT_OPTIONS} />
                      )}
                      <Facet
                        field="omics"
                        label="Omics"
                        filterType="any"
                      />
                      <Facet
                        field="states.keyword"
                        label="States"
                        filterType="any"
                        isFilterable={true}
                      />
                      <Facet
                        field="world_heritage_site.keyword"
                        label="World Heritage Site"
                        view={BooleanFacet}
                      />
                      <Facet
                        field="visitors"
                        label="Visitors"
                        view={SingleLinksFacet}
                      />
                      <Facet
                        field="date_established"
                        label="Date Established"
                        isFilterable={true}
                        filterType="any"
                      />
                      <Facet
                        field="location"
                        label="Distance"
                        filterType="any"
                      />
                      <Facet field="visitors" label="visitors" />
                      <Facet
                        field="acres"
                        label="Acres"
                        view={SingleSelectFacet}
                      />
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField="label"
                    //   urlField="nps_link"
                    //   thumbnailField="image_url"
                      shouldTrackClickThrough={true}
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
