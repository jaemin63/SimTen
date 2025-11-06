var KAREL_PROGRAM_NAME = "IPL_DN_SimTen_Cfg";
var doNames = [];

function ihmiGet(kvar, cb) {
  try {
    top.ihmi_getVar(KAREL_PROGRAM_NAME, kvar, cb);
  } catch (e) {
    console.error("ihmi_getVar error " + kvar + ": " + e);
  }
}

function loadDONames() {
  var select = document.getElementById("doSelect");
  for (let i = 0; i < 10; i++) {
    ihmiGet("DO_NAME[" + (i + 1) + "]", function (kprog, kv, type, name) {
      if (name && name.trim() !== "") {
        let option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      }
    });
  }
}

function updateParameter() {
  var doName = document.getElementById("doSelect").value;
  var writeVal = document.querySelector('input[name="doState"]:checked')?.value || "0";
  var waitVal = document.getElementById("chkWait").checked ? "1" : "0";
  var paramStr = "'" + doName + "'," + writeVal + "," + waitVal;

  try {
    parent.setInstructionParam(paramStr);
  } catch (e) {
    console.log("Parameter: " + paramStr);
  }
}

function dropDOWriteData(argStr) {
  document.getElementById("doSelect").value = "";
  document.querySelector('input[name="doState"][value="0"]').checked = true;
  document.getElementById("chkWait").checked = false;
  updateParameter();
  return true;
}

function dispDOWriteData(argStr) {
  var params = argStr.split(",");
  var doName = params[0]?.replace(/'/g, "") || "";
  var writeVal = params[1] || "0";
  var waitVal = params[2] || "0";

  document.getElementById("doSelect").value = doName;
  document.querySelector('input[name="doState"][value="' + writeVal + '"]').checked = true;
  document.getElementById("chkWait").checked = waitVal === "1";

  return true;
}

window.onload = function () {
  loadDONames();
};
