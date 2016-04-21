import React from 'react';
import Highlight from 'react-highlighter';


export function arrWithoutTerm(obj, term) {
  var results = [];
  for (var key in obj[0]) {
    results.push(key);
  }
  results.splice(results.indexOf(term), 1);
  return results;
}


export function highlightTerms(objAttr, terms) {
  if (objAttr == null)
    return undefined;
  if (objAttr !== undefined)
    objAttr = objAttr.toString();
  return <Highlight search={terms}>{objAttr}</Highlight>;
}


export function sortColumn(col, level) {
    return {
      column: col,
      sortFunction: function(a, b) {
        let nameA = a;
        let nameB = b;
        if (level === 2) {
          nameA = nameA.props;
          nameB = nameB.props;
          let propCheck = undefinedCheck(nameA, nameB);
          if (propCheck !== 0)
            return propCheck;

          nameA = nameA.children;
          nameB = nameB.children;
          propCheck = undefinedCheck(nameA, nameB);
          if (propCheck !== 0)
            return propCheck;
        }

        nameA = nameA.props;
        nameB = nameB.props;

        let propCheck = undefinedCheck(nameA, nameB);
        if (propCheck !== 0)
          return propCheck;

        nameA = nameA.children;
        nameB = nameB.children;

        if (typeof nameA === "string") {
          nameA = nameA.toLowerCase();
          nameB = nameB.toLowerCase();
          return nameA.localeCompare(nameB);
        }
        else if (typeof nameA === "number")
          return nameA > nameB ? 1 : -1;
      }
    };
}

function undefinedCheck(a, b) {
  if (a == undefined && b != undefined || a == undefined && b == undefined)
    return -1;
  else if (a != undefined && b == undefined)
    return 1;
  else
    return 0;
}