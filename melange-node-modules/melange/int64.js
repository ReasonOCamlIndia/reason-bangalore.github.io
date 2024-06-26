// Generated by Melange

import * as Caml from "melange.js/caml.js";
import * as Caml_format from "melange.js/caml_format.js";
import * as Caml_hash from "melange.js/caml_hash.js";
import * as Caml_int64 from "melange.js/caml_int64.js";
import * as Caml_js_exceptions from "melange.js/caml_js_exceptions.js";
import * as Stdlib from "./stdlib.js";

var zero = Caml_int64.zero;

var one = Caml_int64.one;

function succ(n) {
  return Caml_int64.add(n, Caml_int64.one);
}

function pred(n) {
  return Caml_int64.sub(n, Caml_int64.one);
}

function abs(n) {
  if (Caml.i64_ge(n, Caml_int64.zero)) {
    return n;
  } else {
    return Caml_int64.neg(n);
  }
}

var min_int = Caml_int64.min_int;

function lognot(n) {
  return Caml_int64.xor(n, Caml_int64.neg_one);
}

var max_int = Caml_int64.of_int32(Stdlib.max_int);

function unsigned_to_int(n) {
  if (Caml_int64.compare(zero, n) <= 0 && Caml_int64.compare(n, max_int) <= 0) {
    return Caml_int64.to_int32(n);
  }
  
}

function to_string(n) {
  return Caml_format.caml_int64_format("%d", n);
}

function of_string_opt(s) {
  try {
    return Caml_format.caml_int64_of_string(s);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Stdlib.Failure) {
      return ;
    }
    throw exn;
  }
}

var compare = Caml_int64.compare;

function equal(x, y) {
  return Caml_int64.compare(x, y) === 0;
}

function unsigned_compare(n, m) {
  return Caml_int64.compare(Caml_int64.sub(n, min_int), Caml_int64.sub(m, min_int));
}

function min(x, y) {
  if (Caml.i64_le(x, y)) {
    return x;
  } else {
    return y;
  }
}

function max(x, y) {
  if (Caml.i64_ge(x, y)) {
    return x;
  } else {
    return y;
  }
}

function unsigned_div(n, d) {
  if (Caml.i64_lt(d, zero)) {
    if (unsigned_compare(n, d) < 0) {
      return zero;
    } else {
      return one;
    }
  }
  var q = Caml_int64.lsl_(Caml_int64.div(Caml_int64.lsr_(n, 1), d), 1);
  var r = Caml_int64.sub(n, Caml_int64.mul(q, d));
  if (unsigned_compare(r, d) >= 0) {
    return Caml_int64.add(q, Caml_int64.one);
  } else {
    return q;
  }
}

function unsigned_rem(n, d) {
  return Caml_int64.sub(n, Caml_int64.mul(unsigned_div(n, d), d));
}

function seeded_hash(seed, x) {
  return Caml_hash.caml_hash(10, 100, seed, x);
}

function hash(x) {
  return Caml_hash.caml_hash(10, 100, 0, x);
}

var minus_one = Caml_int64.neg_one;

var max_int$1 = Caml_int64.max_int;

export {
  zero ,
  one ,
  minus_one ,
  unsigned_div ,
  unsigned_rem ,
  succ ,
  pred ,
  abs ,
  max_int$1 as max_int,
  min_int ,
  lognot ,
  unsigned_to_int ,
  of_string_opt ,
  to_string ,
  compare ,
  unsigned_compare ,
  equal ,
  min ,
  max ,
  seeded_hash ,
  hash ,
}
/* No side effect */
