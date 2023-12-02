/**
 * @type: reducer
 * @name: user
 */

import { createReducer } from "@reduxjs/toolkit";

const userReducer = createReducer({}, (builder) => {
  builder.addCase("@user/delete", function (draft, action) {
    // console.log(action);
  });
});

export default userReducer;
