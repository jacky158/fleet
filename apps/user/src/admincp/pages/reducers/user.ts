/**
 * @type: reducer
 * @name: user
 * @bundle: admincp
 */

import { createReducer } from "@reduxjs/toolkit";

const userReducer = createReducer({}, (builder) => {
  builder.addCase("@user/delete", function (draft, action) {
    if (draft || action) {
      // console.log(action);
    }
  });
});

export default userReducer;
