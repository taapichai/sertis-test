import reducers from "../reducers";

test("reducers", () => {
  let state;
  state = reducers(
    {
      toDoList: [],
      toSayHelloList: [],
      BMs: [],
      bmIsLoading: true,
      adAccounts: [],
      branches: [],
      brands: [],
      departments: [],
      selectedStartDate: "",
      selectedEndDate: "",
      moduleName: "CGO_MARKETING",
      userGroup: "CG_GROUP",
      t1_data: [
        {
          id: 16,
          name: "Test Gen Audiences for 7th Generation.",
          completed: 0,
          total: 0
        },
        {
          id: 17,
          name: "Test create audience for Breeze.",
          completed: 0,
          total: 0
        },
        { id: 18, name: "Test by Maxi", completed: 30000, total: 30000 }
      ]
    },
    {
      type: "LIST_BUSINESS_MANAGER_SUCCEEDED",
      BMs: [
        { id: "1704299786531439", label: "Office Mate" },
        { id: "1529491740423514", label: "PowerBuy" },
        { id: "1369271253191601", label: "Tops SuperMarket" },
        { id: "267922777043018", label: "SuperSport Online" }
      ]
    }
  );
  expect(state).toEqual({
    toDoList: [],
    toSayHelloList: [],
    BMs: [
      { id: "1704299786531439", label: "Office Mate" },
      { id: "1529491740423514", label: "PowerBuy" },
      { id: "1369271253191601", label: "Tops SuperMarket" },
      { id: "267922777043018", label: "SuperSport Online" }
    ],
    bmIsLoading: false,
    adAccounts: [],
    branches: [],
    brands: [],
    departments: [],
    selectedStartDate: "",
    selectedEndDate: "",
    moduleName: "CGO_MARKETING",
    userGroup: "CG_GROUP",
    t1_data: [
      {
        id: 16,
        name: "Test Gen Audiences for 7th Generation.",
        completed: 0,
        total: 0
      },
      {
        id: 17,
        name: "Test create audience for Breeze.",
        completed: 0,
        total: 0
      },
      { id: 18, name: "Test by Maxi", completed: 30000, total: 30000 }
    ]
  });
});
