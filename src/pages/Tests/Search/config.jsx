import ElasticSearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const connector = new ElasticSearchAPIConnector({
    host:
      // process.env.REACT_ELASTICSEARCH_HOST ||
      "http://localhost:9200",
    index: 
      // process.env.REACT_ELASTICSEARCH_INDEX || 
      "efo_trait,publication",
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
        id_colon: {
          weight: 4
        },
        label: {
          weight: 3
        },
        synonyms: {
          weight: 2
        },
        mapped_terms: {
          weight: 2
        },
        description: {
          weight: 2
        },
        title: {}
      },
      result_fields: {
        id: { 
          snippet: {
            size: 100,
            fallback: true
          }
        },
        label: { raw: { } },
        // label: {
        //   snippet: {
        //     size: 100,
        //     fallback: true
        //   }
        // },
        // "traitcategory.label" : { raw: { value: "label"} },
        description: {
          snippet: {
            size: 100,
            fallback: true
          }
        },
        title:  {
            snippet: {
              size: 100,
              fallback: true
            }
        }
      },
      disjunctiveFacets: [
        "acres",
        "states.keyword",
        "date_established",
        "location"
      ],
      facets: {
        "world_heritage_site.keyword": { type: "value" },
        "states.keyword": { type: "value", size: 30, sort: "count" },
        omics: {
          label: 'Omics',
          type: "range",
          ranges: [
            { from: 0, to: 100, name: "Metabolomics" },
            { from: 100, to: 500, name: "Proteomics" },
            { from: 500, name: "Transcriptomics" }
          ]
        },
        location: {
          // San Francisco. In the future, make this the user's current position
          center: "37.7749, -122.4194",
          type: "range",
          unit: "mi",
          ranges: [
            { from: 0, to: 100, name: "Nearby" },
            { from: 100, to: 500, name: "A longer drive" },
            { from: 500, name: "Perhaps fly?" }
          ]
        },
        visitors: {
          type: "range",
          ranges: [
            { from: 0, to: 10000, name: "0 - 10000" },
            { from: 10001, to: 100000, name: "10001 - 100000" },
            { from: 100001, to: 500000, name: "100001 - 500000" },
            { from: 500001, to: 1000000, name: "500001 - 1000000" },
            { from: 1000001, to: 5000000, name: "1000001 - 5000000" },
            { from: 5000001, to: 10000000, name: "5000001 - 10000000" },
            { from: 10000001, name: "10000001+" }
          ]
        }
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