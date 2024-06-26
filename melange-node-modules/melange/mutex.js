// Generated by Melange

import * as Curry from "melange.js/curry.js";

function create(param) {
  return {
          contents: false
        };
}

function lock(t) {
  t.contents = true;
}

function try_lock(t) {
  if (t.contents) {
    return false;
  } else {
    t.contents = true;
    return true;
  }
}

function unlock(t) {
  t.contents = false;
}

function protect(m, f) {
  m.contents = true;
  var x;
  try {
    x = Curry._1(f, undefined);
  }
  catch (e){
    m.contents = false;
    throw e;
  }
  m.contents = false;
  return x;
}

export {
  create ,
  lock ,
  try_lock ,
  unlock ,
  protect ,
}
/* No side effect */
