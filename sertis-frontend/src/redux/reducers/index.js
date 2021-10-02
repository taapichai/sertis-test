import { combineReducers } from "redux";
import buildBlog from "./BlogReducer";
import buildCustomAudience from "./BuildCustomAudience";
import buildCustomAudienceT1SVOC from "./BuildCustomAudienceT1SVOC";

export default combineReducers({
  ca: buildCustomAudience,
  caSVOC: buildCustomAudienceT1SVOC,
  blog: buildBlog,
});
