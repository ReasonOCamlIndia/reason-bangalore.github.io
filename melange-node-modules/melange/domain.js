// Generated by Melange

import * as Caml_js_exceptions from "melange.js/caml_js_exceptions.js";
import * as Caml_option from "melange.js/caml_option.js";
import * as Curry from "melange.js/curry.js";
import * as Stdlib__Fun from "./fun.js";
import * as Stdlib__List from "./list.js";
import * as Stdlib__Printexc from "./printexc.js";
import * as Stdlib__Queue from "./queue.js";

var atomic_lock = {
  contents: false
};

function atomically(f) {
  atomic_lock.contents = true;
  return Stdlib__Fun.protect((function (param) {
                atomic_lock.contents = false;
              }), f);
}

var first_spawn_queue = {
  length: 0,
  first: /* Nil */0,
  last: /* Nil */0
};

var first_spawn_occurred = {
  contents: false
};

function before_first_spawn(f) {
  atomically(function (param) {
        if (first_spawn_occurred.contents) {
          throw {
                RE_EXN_ID: "Invalid_argument",
                _1: "Domain.before_first_spawn",
                Error: new Error()
              };
        }
        Stdlib__Queue.push(f, first_spawn_queue);
      });
}

function maybe_first_spawn(param) {
  atomically(function (param) {
        if (first_spawn_occurred.contents) {
          return ;
        }
        first_spawn_occurred.contents = true;
        while(first_spawn_queue.length !== 0) {
          var f = Stdlib__Queue.take(first_spawn_queue);
          Curry._1(f, undefined);
        };
      });
}

var at_exit_table = {
  contents: /* [] */0
};

function at_exit(f) {
  atomically(function (param) {
        at_exit_table.contents = {
          hd: f,
          tl: at_exit_table.contents
        };
      });
}

function get_id(t) {
  return t.id;
}

function self(param) {
  return 0;
}

function cpu_relax(param) {
  
}

function is_main_domain(param) {
  return true;
}

function recommended_domain_count(param) {
  return 1;
}

var all_keys = {
  contents: /* [] */0
};

function new_key(split_from_parent, init) {
  var key = {
    table: undefined,
    split_from_parent: split_from_parent,
    init: init
  };
  atomically(function (param) {
        all_keys.contents = {
          hd: /* Key */{
            _0: key
          },
          tl: all_keys.contents
        };
      });
  return key;
}

function get(key) {
  var v = key.table;
  if (v !== undefined) {
    return Caml_option.valFromOption(v);
  }
  var v$1 = Curry._1(key.init, undefined);
  atomically(function (param) {
        key.table = Caml_option.some(v$1);
      });
  return v$1;
}

function set(key, v) {
  atomically(function (param) {
        key.table = Caml_option.some(v);
      });
}

function prepare_split_keys_before_spawn(param) {
  return Stdlib__List.filter_map((function (param) {
                var key = param._0;
                var split = key.split_from_parent;
                if (split === undefined) {
                  return ;
                }
                var current = get(key);
                var child = Curry._1(split, current);
                return /* Key_value */{
                        _0: key,
                        _1: child
                      };
              }), all_keys.contents);
}

function perform_split_after_spawn(split_keys) {
  var perform_split = function (param) {
    set(param._0, param._1);
  };
  Stdlib__List.iter(perform_split, split_keys);
}

var next_id = {
  contents: 0
};

function spawn(f) {
  maybe_first_spawn(undefined);
  var status = {
    contents: /* Running */0
  };
  var split_keys = prepare_split_keys_before_spawn(undefined);
  var handle = new Promise((function (resolve, reject) {
          var param = [
            split_keys,
            status
          ];
          var status$1 = param[1];
          perform_split_after_spawn(param[0]);
          var exit = 0;
          var v;
          try {
            v = Curry._1(f, undefined);
            exit = 1;
          }
          catch (raw_exn){
            var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
            var bt;
            status$1.contents = {
              TAG: /* Error */1,
              _0: exn,
              _1: bt
            };
            reject(exn);
          }
          if (exit === 1) {
            status$1.contents = {
              TAG: /* Return */0,
              _0: v
            };
            resolve(v);
          }
          var at_exit_callbacks = atomically(function (param) {
                return at_exit_table.contents;
              });
          try {
            Stdlib__List.iter((function (f) {
                    Curry._1(f, undefined);
                  }), at_exit_callbacks);
            return ;
          }
          catch (raw_exn$1){
            var exn$1 = Caml_js_exceptions.internalToOCamlException(raw_exn$1);
            var match = status$1.contents;
            if (typeof match === "number") {
              throw {
                    RE_EXN_ID: "Assert_failure",
                    _1: [
                      "jscomp/stdlib/domain.ml",
                      77,
                      19
                    ],
                    Error: new Error()
                  };
            }
            if (match.TAG !== /* Return */0) {
              return ;
            }
            var bt$1;
            status$1.contents = {
              TAG: /* Error */1,
              _0: exn$1,
              _1: bt$1
            };
            return ;
          }
        }));
  return {
          id: (next_id.contents = next_id.contents + 1 | 0, next_id.contents),
          handle: handle,
          status: status
        };
}

function join(t) {
  return t.handle.then(function (param) {
                var v = t.status.contents;
                if (typeof v === "number") {
                  throw {
                        RE_EXN_ID: "Assert_failure",
                        _1: [
                          "jscomp/stdlib/domain.ml",
                          179,
                          17
                        ],
                        Error: new Error()
                      };
                }
                if (v.TAG === /* Return */0) {
                  return Promise.resolve(v._0);
                }
                throw v._0;
              }).catch(function (param) {
              var match = t.status.contents;
              if (typeof match === "number") {
                throw {
                      RE_EXN_ID: "Assert_failure",
                      _1: [
                        "jscomp/stdlib/domain.ml",
                        186,
                        30
                      ],
                      Error: new Error()
                    };
              }
              if (match.TAG === /* Return */0) {
                throw {
                      RE_EXN_ID: "Assert_failure",
                      _1: [
                        "jscomp/stdlib/domain.ml",
                        186,
                        30
                      ],
                      Error: new Error()
                    };
              }
              throw match._0;
            });
}

var DLS = {
  new_key: new_key,
  get: get,
  set: set
};

export {
  spawn ,
  join ,
  get_id ,
  self ,
  before_first_spawn ,
  at_exit ,
  cpu_relax ,
  is_main_domain ,
  recommended_domain_count ,
  DLS ,
}
/* Stdlib__Fun Not a pure module */
