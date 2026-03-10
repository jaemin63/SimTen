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
  var mode = document.querySelector('input[name="doMode"]:checked').value;

  var writeVal = (mode === "toggle") ? "1" : "0";
  var modeVal  = (mode === "toggle") ? "1" : "0";

  // doName, writeVal, modeVal
  var paramStr = "'" + doName + "'," + writeVal + "," + modeVal;

  try { parent.setInstructionParam(paramStr); } catch(e) {}
}

function dropDOWriteData(argStr) {
  document.getElementById("doSelect").value = "";
  document.querySelector('input[name="doMode"][value="hold"]').checked = true;
  updateParameter();
  return true;
}

function dispDOWriteData(argStr) {
  var params = argStr.split(",");
  var doName = params[0]?.replace(/'/g,"") || "";
  var writeVal = params[1] || "0";

  document.getElementById("doSelect").value = doName;

  var mode = (writeVal === "1") ? "toggle" : "hold";
  document.querySelector(`input[name="doMode"][value="${mode}"]`).checked = true;

  return true;
}

window.onload = function () {
  loadDONames();
};
