import { LIST_BRAND, SELECTED_BRANDS } from "./actionTypes";

export function listBrand(bu_id) {
  return {
    type: LIST_BRAND,
    payload: {
      bu_id: bu_id
    }
  };
}

export function selectedBrands(selectedBrands) {
  return {
    type: SELECTED_BRANDS,
    payload: {
      selectedBrands: selectedBrands
    }
  };
}
