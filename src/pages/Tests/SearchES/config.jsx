import ElasticSearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const connector = new ElasticSearchAPIConnector({
    host:
      // process.env.REACT_ELASTICSEARCH_HOST ||
      process.env.OMICSPRED_ES_URL,
    index: 
      'gene,protein,score',
      // process.env.REACT_ELASTICSEARCH_INDEX || 
      // "gene,platform,protein,score",
    // apiKey:
    //   // process.env.REACT_ELASTICSEARCH_API_KEY ||
    //   "SlUzdWE0QUJmN3VmYVF2Q0F6c0I6TklyWHFIZ3lTbHF6Yzc2eEtyeWFNdw=="
});


export const config = {
    debug: true,
    alwaysSearchOnInitialLoad: true,
    apiConnector: connector,
    //hasA11yNotifications: true,
    searchQuery: {
      filters: [],
      search_fields: {
        id: {
          weight: 4
        },
        name: {
          weight: 3
        },
        // platform_name: {
        //   weight: 1
        // },
        // omics_type: {
        //   weight: 1
        // }
      },
      result_fields: {
        id: { 
          snippet: {
            size: 100,
            fallback: true
          }
        },
        name: { snippet: {
            size: 100,
            fallback: true
          }
        },
        scores_count: { raw: { } },
        platform_name: { raw: { } },
        omics_type: { raw: { label: "label"} }
        // label: {
        //   snippet: {
        //     size: 100,
        //     fallback: true
        //   }
        // },
        // "traitcategory.label" : { raw: { value: "label"} },
      },
      disjunctiveFacets: [
        "name.keyword",
        "omics_type.keyword",
        "platform_name.keyword",
        "scores_count",
        "states.keyword"
      ],
      facets: {
        "name.keyword": {
          "type": "value",
          "name": "top-five-states",
          "sort": { "count": "desc" },
          "data": [
            {
              "value": "California",
              "count": 8
            },
            {
              "value": "Alaska",
              "count": 5
            },
            {
              "value": "Utah",
              "count": 4
            },
            {
              "value": "Colorado",
              "count": 3
            }
          ]
        },
        "omics_type.keyword": { 
          type: "value",
          data: [
            {
              "value": "Metabolomics",
            },
            {
              "value": "Proteomics",
            },
            {
              "value": "Transcriptomics",
            },
          ]
        },
        "platform_name.keyword": { type: "value" },
        "scores_count": {
          type: "range",
          ranges: [
            { from: 0, to: 100, name: "Small" },
            { from: 100, to: 500, name: "Medium" },
            { from: 500, name: "Large" }
          ]
        },
        // location: {
        //   // San Francisco. In the future, make this the user's current position
        //   // center: "37.7749, -122.4194",
        //   type: "range",
        //   unit: "mi",
        //   ranges: [
        //     { from: 0, to: 100, name: "Nearby" },
        //     { from: 100, to: 500, name: "A longer drive" },
        //     { from: 500, name: "Perhaps fly?" }
        //   ]
        // },
        // "world_heritage_site.keyword": { type: "value" },
        "states.keyword": { type: "value", size: 30, sort: "count" },
        // omics: {
        //   label: 'Omics',
        //   type: "range",
        //   ranges: [
        //     { from: 0, to: 100, name: "Metabolomics" },
        //     { from: 100, to: 500, name: "Proteomics" },
        //     { from: 500, name: "Transcriptomics" }
        //   ]
        // },
        // visitors: {
        //   type: "range",
        //   ranges: [
        //     { from: 0, to: 10000, name: "0 - 10000" },
        //     { from: 10001, to: 100000, name: "10001 - 100000" },
        //     { from: 100001, to: 500000, name: "100001 - 500000" },
        //     { from: 500001, to: 1000000, name: "500001 - 1000000" },
        //     { from: 1000001, to: 5000000, name: "1000001 - 5000000" },
        //     { from: 5000001, to: 10000000, name: "5000001 - 10000000" },
        //     { from: 10000001, name: "10000001+" }
        //   ]
        // }
      }
    },
    autocompleteQuery: {
      results: {
        search_fields: {
            id: {
                weight: 4
            },
            label: {
                weight: 3
            }
        },
        resultsPerPage: 5,
        result_fields: {
            id: { raw: {} },
            label: {
              snippet: {
                size: 100,
                fallback: true
              }
            }
        }
      },
    //   suggestions: {
    //     types: {
    //       documents: {
    //         fields: ["label"]
    //       }
    //     },
    //     size: 10
    //   }
    }
};