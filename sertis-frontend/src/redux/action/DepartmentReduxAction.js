import { LIST_DEPARTMENTS, SELECTED_DEPARTMENTS } from "./actionTypes";

export function listDepartments(bu_id, brand_ids) {
  return {
    type: LIST_DEPARTMENTS,
    payload: {
      bu_id: bu_id,
      brand_ids: brand_ids,
    }
  };
}

export function selectedDepartments(selectedDepartments) {
  return {
    type: SELECTED_DEPARTMENTS,
    payload: {
      selectedDepartments: selectedDepartments
    }
  };
}
