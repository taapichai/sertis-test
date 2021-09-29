import { DELETE_AUDIENCE } from "./actionTypes";

export function deleteAudience(t1_id, moduleName, userGroup) {
  return {
    type: DELETE_AUDIENCE,
    payload: {
      t1_id: t1_id,
      moduleName: moduleName,
      userGroup: userGroup,
    }
  };
}
